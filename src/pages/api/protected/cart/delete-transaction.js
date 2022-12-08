import { getSession } from '@auth0/nextjs-auth0';
import Airtable from 'airtable';
import getById from '../../../../components/db/getById';

const deleteTransaction = async (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('apptpGktGToVH41dj');

  var transactionTable = 'tblTFyoZB0zBQXuRT';

  var { id } = req.body;

  const getRecords = async id => {
    const data = [];

    await base(transactionTable)
      .select({
        view: 'Grid view',
        filterByFormula: `SEARCH(RECORD_ID(), '${id.join(',')}')`,
      })
      .eachPage(function page(records, fetchNextPage) {
        records.forEach(record => {
          data.push(record);
        });
        fetchNextPage();
      })
      .then(res => {})
      .catch(err => {
        throw err;
      });
    return data;
  };

  const data = await getRecords(id);

  data.forEach(record => {
    if (record.fields.status === 'added to cart') {
      record.destroy();
    } else {
      // TODO: catch errors?
    }
  });

  res.json({ success: true });
};

export default deleteTransaction;
