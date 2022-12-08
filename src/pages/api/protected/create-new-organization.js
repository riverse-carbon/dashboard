import Airtable from 'airtable'

const createNewOrganization= async (req, res) => {

  var organization = JSON.parse(req.body)



// users table
const response = await base('tblG56b6iiigWe8kI').create(usersArray.map(user => ({
  'fields': {
    'email': user.email,
    "org": user.orgId? [user.orgId]: [],
    "type": user.type
  }
})))
.then((records) => records.map(record => ({success: !!record.id, email: record.fields.email})))
.catch(err => console.log(err));

  res.send({ results: response})
}

export default createNewOrganization