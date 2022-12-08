import { getSession } from '@auth0/nextjs-auth0';
import Airtable from 'airtable';

const getCartInfo = async (req, res) => {
  var session = getSession(req, res);

  var { email } = session.user;

  // var currentUserId = session.user['https://registry.riverse.io/userId'] || ''
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('apptpGktGToVH41dj');
  var transactionTable = 'tblTFyoZB0zBQXuRT';

  const sortByProject = records => {
    var sortedArray = [];
    var recordsCopy = [...records];

    recordsCopy.forEach(record => {
      var id = record.fields.projectId[0];
      const projectGroup = sortedArray.find(project => project.id === id);
      if (!projectGroup) {
        sortedArray.push({
          id: id,
          sectors: record.fields.sectors,
          tagline: record.fields.tagline,
          uid: record.fields.uid,
          cover: record.fields.cover[0].url,
          transactions: [record],
        });
      } else {
        projectGroup.transactions.push(record);
      }
    });

    return sortedArray;
  };

  var transactions = [];
  await base(transactionTable)
    .select({
      view: 'Grid view',
      maxRecords: 5,
      filterByFormula: `AND({user} = "${email}", {status}='added to cart')`,
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(record => {
        transactions.push({ id: record.id, fields: record.fields });
      });
      fetchNextPage();
    })
    .then(() => {})
    .catch(err => {
      throw err;
    });

  const transactionsSorted = sortByProject(transactions);
  res.json({ data: transactionsSorted });
};

export default getCartInfo;
