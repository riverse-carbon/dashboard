import Airtable from 'airtable'

// TODO: no maxRecords!!

export default async function getProjects (req, res) {
  try {
    const data = []

    // Connect to db
    const base = new Airtable({ apiKey: process.env.API_KEY }).base(
      'apptpGktGToVH41dj'
    )
    // get records
    base('tblRCb5aZpcAw36Wa')
      .select({
        view: process.env.DB_VIEW
      })
      .eachPage(
        function page (records, fetchNextPage) {
          // populate data array
          records.forEach(record => {
            const { id, fields } = record
            const priceRange = ['50', '50']
            if (fields['year-credits-price']) {
              fields.pricesPerYear = []
              fields.creditsPerYear = []
              fields.years = []
              fields['year-credits-price'].forEach(data => {
                const yearCreditsPrice = data.split('|')
                const { 0: year, 1: credits, 2: price } = yearCreditsPrice
                if (price < priceRange[0]) {
                  priceRange[0] = price
                }
                if (price > priceRange[1]) {
                  priceRange[1] = price
                }
                fields.pricesPerYear.push(price)
                fields.creditsPerYear.push(credits)
                fields.years.push(year)
              })
              // const creditsPerYear = fields['year-credits-price'].map(data => {
              //   const yearCreditsPrice = data.split('|')
              //   const { 0:year, 1:credits, 2:price} = yearCreditsPrice
              //       if (price < priceRange[0]) {
              //         priceRange[0] = price
              //   }
              //   if (price > priceRange[1]) {
              //     priceRange[1] = price
              //   }
              //   return {year, credits, price}
              // }
              // )
              // fields.creditsPerYear = creditsPerYear
            }
            fields.priceRange = priceRange
            data.push({ id, fields })
          })
          fetchNextPage()
        },
        function done (err) {
          if (err) {
            throw err
          }
          if (data.length === 0) throw 'No available data'
          res.status(200).json({ data })
        }
      )
  } catch (err) {
    res.status(500).json({ err })
  }
}
