import Airtable from 'airtable'

// TODO: no maxRecords!!

export default async function getProjects (req, res) {
  try {
    const data = []
    const queryParams = {}
    if (req.query.limit) {
      queryParams.maxRecords = +req.query.limit
    }

    // Connect to db
    const base = new Airtable({ apiKey: process.env.API_KEY }).base(
      'apptpGktGToVH41dj'
    )
    // get records
    base('tblRCb5aZpcAw36Wa')
      .select({
        view: 'Dashboard projects',
        ...queryParams
      })
      .eachPage(
        function page (records, fetchNextPage) {
          // populate data array
          records.forEach(record => {
            const { id, fields } = record
            data.push({ id, fields })
          })
          fetchNextPage()
        },
        function done (err) {
          if (err) {
            throw err
          }
          res.status(200).json({ data })
        }
      )
  } catch (err) {
    res.status(500).json({ err })
  }
}
