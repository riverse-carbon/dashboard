import Airtable from 'airtable'

const validateCart = async (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'apptpGktGToVH41dj'
  )

  var transactionTable = 'tblTFyoZB0zBQXuRT'

  var { data } = req.body

  const updateTransactionsStatus = async dataArray => {
    var creationResult = await base(transactionTable)
      .update(dataArray)
      .then(results =>
        results.map(result => ({ id: result.id, fields: result.fields }))
      )
      .catch(err => {
        console.log(err)
        // throw new Error(err)
      })
    return creationResult
  }

  const resultFromDB = await data.reduce(async (memo, project) => {
    const result = await memo
    const normalizeProjectData = project.transactions.map(transaction => ({
      id: transaction.id,
      fields: { status: 'validated' }
    }))
    const res = await updateTransactionsStatus(normalizeProjectData)
    result.push(...res)
    return result
  }, [])

  res.json({ data: resultFromDB })
}

export default validateCart
