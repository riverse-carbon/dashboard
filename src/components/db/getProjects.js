import Airtable from 'airtable';

const getAllProjects = async (view = 'Projects list (for web & app)', formula, maxRecords = '', recordTransform) => {
  // Connect to db
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('apptpGktGToVH41dj');

  const data = [];

  // get records
  await base('tblRCb5aZpcAw36Wa')
    .select({
      view,
      filterByFormula: formula,
      maxRecords,
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(record => {
        if (recordTransform) {
          recordTransform(record);
        }
        const { id, fields } = record;
        data.push({ id, fields });
        return { id, fields };
      });
      fetchNextPage();
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      throw err;
    });
  return data;
};

export default getAllProjects;
