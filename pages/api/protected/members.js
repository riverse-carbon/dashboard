import { getSession } from '@auth0/nextjs-auth0'
import axios from 'axios'

async function getMembers (req, res) {
  const org = getSession(req, res).user['org_id']
  // const token = getSession(req, res).accessToken
  const token = process.env.NEXT_PUBLIC_MNGM_TOKEN

  var options = {
    method: 'GET',
    url: `https://dev-3ma0yvb7q0xwy3vk.eu.auth0.com/api/v2/organizations/${org}/members`,
    headers: { authorization: `Bearer ${token}` }
  }

  axios(options)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default getMembers

// import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
// import Airtable from 'airtable'

// async function getProjects (req, res) {
//   try {
//     const data = []

//     // Connect to db
//     const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
//       'apptpGktGToVH41dj'
//     )
//     // get records
//     base('tblJEouCsTaRLICkV')
//       .select({
//         view: 'Grid view'
//       })
//       .eachPage(
//         function page (records, fetchNextPage) {
//           // populate data array
//           records.forEach(record => {
//             const { id, fields } = record
//             data.push({ id, fields })
//           })
//           fetchNextPage()
//         },
//         function done (err) {
//           if (err) {
//             throw err
//           }
//           res.status(200).json({ data })
//         }
//       )
//   } catch (err) {
//     res.status(500).json({ err })
//   }
// }

// const protectedApi = withApiAuthRequired(getProjects)

// export default protectedApi
