import Airtable from 'airtable'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

const getOrganizationById = async (base, orgId) => {
  const res = await base('tblJEouCsTaRLICkV')
    .find(orgId)
    .then(org => org.fields)
    .catch(e => console.log(e))

  return res
}

// const getMembers = async (base, orgId) => {
//   const res = await base('tblG56b6iiigWe8kI')
//   .select({
//     view: 'Grid view',
//     filterByFormula: `{org} = '${orgId}'`
//   })
//   .eachPage(function page (records, fetchNextPage) {
//     records.forEach(record => {
//       result.push({ orgId: record.fields.org[0], role: record.fields.role })
//     })
//     fetchNextPage()
//   })
//   .then(() => {})
//   .catch(err => {
//     throw err
//   })
// }

const GetOrganization = async (req, res) => {
  const session = getSession(req, res)
  var orgId = session.user['https://registry.riverse.io/org'] || ''
  // var role = session.user['https://registry.riverse.io/role'] || '';
  // var currentUser = session.user['https://registry.riverse.io/userId'] || '';
  // var {email:userEmail } = session.user
  // Connect to db
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'apptpGktGToVH41dj'
  )

  const organization = await getOrganizationById(base, orgId)

  const users = organization['name (from users)'].map((firstName, i) => {
    const lastName = organization['surname (from users)'][i]
    const role = organization['role (from users)'][i]
    const email = organization['email (from users)'][i]
    const active = organization['active (from users)'][i]
    return { firstName, lastName, role, email, active }
  })

  // TODO: transactions? inventory? organization type?
  const organizationDataSplit = {
    organization: {
      name: organization['organization'],
      contribution: organization['contribution(€)'],
      cccTotal: organization['ccc_total'],
      users: users
    },
    billingInfo: {
      siren: organization['SIREN'],
      vatNumber: organization['VAT number'],
      address: organization['billing-address'],
      country: organization['country']
    }
  }

  res.send({ organization: organizationDataSplit })

  // var result = []
  // // get 1 record from users table
  // await base('tblG56b6iiigWe8kI')
  //   .select({
  //     view: 'Grid view',
  //     maxRecords: 1,
  //     filterByFormula: `{email} = '${userEmail}'`
  //   })
  //   .eachPage(function page (records, fetchNextPage) {
  //     records.forEach(record => {
  //       result.push({ orgId: record.fields.org[0], role: record.fields.role })
  //     })
  //     fetchNextPage()
  //   })
  //   .then(() => {})
  //   .catch(err => {
  //     throw err
  //   })
  // console.log(result);

  //   const session = getSession(req, res);

  //   const {email } = session.user
  // var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('apptpGktGToVH41dj');

  // const organizationTableId = 'tblJEouCsTaRLICkV'

  // const response = await base(organizationTableId).create(usersArray.map(user => ({
  //   'fields': {
  //     'email': user.email,
  //     "org": user.orgId? [user.orgId]: [],
  //     "type": user.type
  //   }
  // })))
  // .then((records) => records.map(record => ({success: !!record.id, email: record.fields.email})))
  // .catch(err => console.log(err));

  //   res.send({ results: response})
}

export default withApiAuthRequired(GetOrganization)
