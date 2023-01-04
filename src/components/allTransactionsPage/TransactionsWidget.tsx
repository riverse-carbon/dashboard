import { useQueryClient } from '@tanstack/react-query';
import Button from 'components/Button';
import { transactions_keys } from 'components/hooks/api/transactions';
import type { TransactionsSortedByMonth } from 'components/types/transactions';
import { MouseEventHandler } from 'react';
import TransactionsGroupedByMonth from './TransactionsGroupedByMonth';

type TransactionProps = {
  data: TransactionsSortedByMonth[];
};

const TransactionsWidget = ({ data }: TransactionProps): JSX.Element => {
  const queryClient = useQueryClient();
  const transactionsListId = 'all-transactions-list';
  const transactionsList = data.map(node => (
    <li key={node.month} className='space-y-2'>
      <TransactionsGroupedByMonth data={node} />
    </li>
  ));

  // on more button click invalidate the query to fetch all transactions (need to enable query when real data can be fetched from backend)
  const handleDataLoad: MouseEventHandler<HTMLButtonElement> = e => {
    void queryClient.invalidateQueries({ queryKey: transactions_keys.getTransactions() });
    const button = e.target as HTMLButtonElement;
    button.setAttribute('hidden', 'true');
  };

  return (
    <section className='space-y-5'>
      <h2 className='text-xl'>Latest removal activity</h2>
      <ul className='space-y-5' role='list' id={transactionsListId}>
        {transactionsList}
      </ul>
      {/* use button to fetch the rest of data */}
      <Button label='' controls={transactionsListId} onClick={handleDataLoad} variant='centered'>
        <>
          Load more <span className='sr-only'>transactions</span>
        </>
      </Button>
    </section>
  );
};

export default TransactionsWidget;
