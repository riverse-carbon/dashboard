import Airtable from 'airtable'

const createNewUser = async (req, res) => {

  var usersArray = JSON.parse(req.body)

  // const usersArray = [{email: 'test@org.io', orgId: 'recxD9lZb2wdsGjkD', type: 'buyer'}]
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('apptpGktGToVH41dj');

// users table id below
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

export default createNewUser