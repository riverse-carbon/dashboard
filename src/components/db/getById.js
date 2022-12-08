import Airtable from "airtable"

var getById = async (base, table, id) => {

  var data = await base(table)
  .find(id)
  .then(record => ({id: record.id, fields: record.fields}))
  .catch(e => {console.log(e)})
  return data
}

export default getById