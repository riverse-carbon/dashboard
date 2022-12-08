import Airtable from 'airtable';

// TODO: no maxRecords!!

export default async function getAllFilters(req, res) {
  try {
    const { filters } = JSON.parse(req.body);
    const dataSets = {};
    filters.forEach(filter => {
      dataSets[filter] = new Set();
    });

    // Connect to db
    const base = new Airtable({ apiKey: process.env.API_KEY }).base('apptpGktGToVH41dj');
    // get records
    base('tblRCb5aZpcAw36Wa')
      .select({
        view: 'Dashboard projects',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            const { fields } = record;
            filters.forEach(filter => {
              var value = fields[filter];
              if (Array.isArray(value)) {
                value.forEach(val => {
                  dataSets[filter].add(val);
                });
              } else {
                dataSets[filter].add(value);
              }
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            throw err;
          }
          const data = Object.entries(dataSets).map(entry => {
            const name = entry[0];
            const values = [];
            entry[1].forEach(val => {
              values.push(val);
            });
            const label = name.charAt(0).toUpperCase() + name.slice(1);

            return { name, values, label };
          });
          res.status(200).json({ data });
        }
      );
  } catch (err) {
    res.status(500).json({ err });
  }
}
