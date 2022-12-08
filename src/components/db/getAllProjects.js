import Airtable from 'airtable'

const getAllProjects = async (apiKey, view) => {
  // Connect to db
  const base = new Airtable({ apiKey }).base('apptpGktGToVH41dj')

  const data = []

  // get records
  await base('tblRCb5aZpcAw36Wa')
    .select({
      view
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
  return data
}

export default getAllProjects
