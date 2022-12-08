// const CreditTransaction = async (req, res) => {
//   const data = req.body
//   const success = !!data.creditsPurchased
//   setTimeout(() => {
//     res.json({ success , data })
//   }, 1000);
// }

// export default CreditTransaction

import { getSession } from '@auth0/nextjs-auth0'
import Airtable from 'airtable'
import verifyUserEmail from '../../../components/db/verifyUserEmail'

const Transaction = async (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'apptpGktGToVH41dj'
  )

  var transactionTable = 'tblTFyoZB0zBQXuRT'

  var session = getSession(req, res)
  var currentUserId = session.user['https://registry.riverse.io/userId'] || ''
  var currentUserEmail = session.user.email

  var userVerified = await verifyUserEmail(
    base,
    currentUserId,
    currentUserEmail
  )

  if (!userVerified) {
    console.log('user not verified')
    return null
  }

  var { transactionsList } = req.body

  var transactionsListTableFormat = transactionsList.map(transaction => ({
    fields: transaction
  }))

  // MAX 10 at once!

  var creationResults = await base(transactionTable)
    .create(transactionsListTableFormat)
    .then(results => results)
    .catch(err => {
      throw new Error(err)
    })

  res.json({ results: creationResults })

  // status(Pending,Validated,Cancelled), actionType(purchase,transfer) project credits vintage mechanism comment(?) buyer inventory(?should come from other fields?)
}

export default Transaction
