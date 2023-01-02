import Head from 'next/head';

import { useTransactions } from 'components/hooks/api/transactions';
import { getFakeTransactions } from 'components/allTransactionsPage/fakeData';
import Hero from 'components/allTransactionsPage/Hero';
import TransactionsWidget from 'components/allTransactionsPage/TransactionsWidget';
import type { Transaction, TransactionsSortedByMonth } from 'components/types/transactions';
import Documentation from 'components/widgets/Documentation';
import WidgetWrapper from 'components/widgets/WidgetWrapper';

type PagePropsType = {
  data: TransactionsSortedByMonth[];
  total: number;
};

// TODO: ask William about staleTime on transactions

const Page = ({ data, total }: PagePropsType): JSX.Element => {
  // use initial data from getStaticProps and fetch all transactions data if clicked on 'more' button
  const { data: transactions, isError } = useTransactions(data);

  return (
    <>
      <Head>
        <title>Public registry | Riverse</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <h1 className='sr-only'>Transactions registry</h1>
      <div className='max-w-screen-lg mx-auto space-y-10'>
        <Hero total={total} />
        <a href='https://www.riverse.io/registry' target='_blank' rel='noreferrer' className='text-center block'>
          Take a look at the transaction register
        </a>
        <WidgetWrapper>
          {isError ? <p className='text-xl'>Error while loading data</p> : <TransactionsWidget data={transactions} />}
        </WidgetWrapper>
        <WidgetWrapper>
          <Documentation />
        </WidgetWrapper>
      </div>
    </>
  );
};

export default Page;

export function getStaticProps() {
  // replace by intial data when routes done
  const res = getFakeTransactions();

  const data: Transaction[] = res.data;
  // sum of credits removed
  let totalRiverse = 0;
  const sortedByMonth: TransactionsSortedByMonth[] = [];

  const sameMonthAndYear = (dateOne: string, dateTwo: string) => {
    const dateOneAsDate = new Date(dateOne);
    const dateTwoAsDate = new Date(dateTwo);
    const dateOneYear = dateOneAsDate.getFullYear();
    const dateOneMonth = dateOneAsDate.getMonth();
    const dateTwoMonth = dateTwoAsDate.getMonth();
    const dateTwoYear = dateTwoAsDate.getFullYear();
    return dateOneMonth === dateTwoMonth && dateOneYear === dateTwoYear;
  };

  data.forEach(transaction => {
    const { carbonAmount } = transaction;
    totalRiverse += carbonAmount;

    const currMonth = transaction.purchaseDate;
    // find corresponding month or add a new one if it doesn't exist
    const currMonthIndex = sortedByMonth.findIndex(date => sameMonthAndYear(date.month, currMonth));
    if (currMonthIndex === -1) {
      sortedByMonth.push({ month: currMonth, total: carbonAmount, transactions: [transaction] });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sortedByMonth[currMonthIndex]!.total += carbonAmount;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sortedByMonth[currMonthIndex]!.transactions.push(transaction);
    }
  });

  sortedByMonth.sort((a, b) => Date.parse(b.month) - Date.parse(a.month));

  // refetch  initial data every day with revalidate (in seconds)
  return { props: { data: sortedByMonth, total: totalRiverse }, revalidate: 86400 };
}
