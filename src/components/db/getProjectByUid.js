import Airtable from 'airtable'

const getProjectByUid = async (apiKey, view, uid) => {
  // Connect to db
  const base = new Airtable({ apiKey }).base('apptpGktGToVH41dj')
  const data = []

  // get records
  await base('tblRCb5aZpcAw36Wa')
    .select({
      view,
      maxRecords: 1,
      filterByFormula: `{uid} = '${uid.toUpperCase()}'`
    })
    .eachPage(function page (records, fetchNextPage) {
      records.forEach(record => {
        const { id, fields } = record
        data.push({ id, fields })
      })
      fetchNextPage()
    })
    // eslint-disable-next-line
    .then(res => {})
    .catch(err => {
      throw err
    })
  return data[0] || []
}

export default getProjectByUid
