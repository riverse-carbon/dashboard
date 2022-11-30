import Airtable from 'airtable'

const getFilters = async (apiKey, view, filtersArray) => {
  // Connect to db
  const base = new Airtable({ apiKey }).base('apptpGktGToVH41dj')

  const dataSets = {}
  filtersArray.forEach(filter => {
    dataSets[filter] = new Set()
  })

  // get records
  await base('tblRCb5aZpcAw36Wa')
    .select({
      view
    })
    .eachPage(function page (records, fetchNextPage) {
      records.forEach(record => {
        const { fields } = record
        filtersArray.forEach(filter => {
          var value = fields[filter]
          if (Array.isArray(value)) {
            value.forEach(val => {
              dataSets[filter].add(val)
            })
          } else {
            dataSets[filter].add(value)
          }
        })
      })
      fetchNextPage()
    })
    .then(res => {})
    .catch(err => {
      throw err
    })

  const filtersData = Object.entries(dataSets).map(entry => {
    const name = entry[0]
    const values = []
    entry[1].forEach(val => {
      values.push(val)
    })
    const label = name.charAt(0).toUpperCase() + name.slice(1)

    return { name, values, label }
  })
  return filtersData
}

export default getFilters
