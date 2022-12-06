import { getSession } from '@auth0/nextjs-auth0'
import Airtable from 'airtable'
import getById from '../../../components/db/getById'

const deleteTransaction = async (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'apptpGktGToVH41dj'
  )

  var transactionTable = 'tblTFyoZB0zBQXuRT'

  var { id } = req.body

  var record = getById(base, transactionTable, id)

  if (record.fields.status === 'added to cart') {
    var deleted = await base(transactionTable)
      .destroy([id])
      .then(results => results[0])
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
    console.log(deleted)
    res.json({ success: true })
  }
  res.sendStatus(403)
}

export default deleteTransaction
