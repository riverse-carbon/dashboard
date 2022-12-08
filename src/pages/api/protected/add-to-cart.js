import { getSession } from '@auth0/nextjs-auth0';
import Airtable from 'airtable';

const addToCart = async (req, res) => {
  var session = getSession(req, res);

  var currentUserId = session.user['https://registry.riverse.io/userId'] || '';

  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('apptpGktGToVH41dj');

  var transactionTable = 'tblTFyoZB0zBQXuRT';

  var { data } = req.body;

  var maxRecords = 10;

  const addToCart = async dataArray => {
    var creationResult = await base(transactionTable)
      .create(dataArray)
      .then(results => results.map(result => ({ id: result.id, fields: result.fields })))
      .catch(err => {
        console.log(err);
        // throw new Error(err)
      });
    return creationResult;
  };
  const processMaxRecordsPerCall = async (data, maxRecords = 10) => {
    var dataCopy = [...data];

    var dataToProcess = dataCopy.reduce((result, item, index) => {
      const indexToInsert = Math.floor(index / maxRecords);
      if (index % maxRecords === 0) {
        result[indexToInsert] = [];
      }

      const itemWithFields = {
        fields: {
          user: [currentUserId],
          status: 'added to cart',
          projectId: item.projectId,
          actionType: item.actionType,
          credits: item.credits,
          mechanism: item.mechanism,
          year: item.year,
        },
      };
      result[indexToInsert].push(itemWithFields);
      return result;
    }, []);

    const dataFromDB = await dataToProcess.reduce(async (memo, batch) => {
      const result = await memo;
      const res = await addToCart(batch);
      result.push(...res);

      return result;
    }, []);

    return dataFromDB;
  };
  const finalResult = await processMaxRecordsPerCall(data, maxRecords);
  res.json({ data: finalResult });
  // var creationResult = await base(transactionTable)
  //   .create([
  //     {
  //       fields: {
  //         user: [currentUserId],
  //         status: 'added to cart',
  //         ...values
  //       }
  //     }
  //   ])
  //   .then(results => results[0])
  //   .catch(err => {
  //     console.log(err)
  //     // throw new Error(err)
  //   })

  // res.json({ transactionId: creationResult.id })
};

export default addToCart;
