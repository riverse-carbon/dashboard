import classNames from 'classnames';
import type { TransactionsSortedByMonth } from 'components/types/transactions';
import { type MouseEventHandler, useState } from 'react';
import TransactionNode from './TransactionNode';

// TODO: leave or delete current month label

type TransactionsGroupedByMonthProps = {
  data: TransactionsSortedByMonth;
};

// const isCurrentMonth = (month: string) => {
//   const today = new Date();
//   const todayMonth = today.toLocaleDateString('en-GB', { month: 'long' });
//   return todayMonth === month;
// };

const TransactionsGroupedByMonth = ({ data }: TransactionsGroupedByMonthProps): JSX.Element => {
  const { month, transactions, total } = data;
  // get month and year strings
  const monthFormatted = new Date(month).toLocaleDateString('en-GB', { month: 'long' });
  const yearFormatted = new Date(month).getFullYear();

  const [expanded, setExpanded] = useState(false);
  // max transactions when collapsed
  const collapsedTransactions = 2;
  const expandCollapseFunctionality = transactions.length > collapsedTransactions;

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const transactionsList = transactions.map(transaction => (
    <li key={transaction.id}>
      <TransactionNode data={transaction} />
    </li>
  ));

  return (
    <>
      <h3 className='font-bold text-base'>
        <span className='uppercase text-xl'>{monthFormatted} </span>
        {yearFormatted}
        {/* {isCurrentMonth(monthFormatted) ? <span className='font-normal'> (in progress)</span> : ''} */}
      </h3>
      <ul role='list' className='space-y-2.5' id={month}>
        {expandCollapseFunctionality && !expanded ? transactionsList.slice(0, collapsedTransactions) : transactionsList}
        {expandCollapseFunctionality ? (
          <ExpandButton controls={month} expanded={expanded} setExpanded={handleExpand} />
        ) : null}
      </ul>
      <p className='ml-auto mr-1 flex gap-1 items-center max-w-max'>
        CO2 contribution: <span className='text-xl font-bold'>{total} t</span>
      </p>
    </>
  );
};

export default TransactionsGroupedByMonth;

type ExpandButtonProps = {
  expanded: boolean;
  setExpanded: () => void;
  controls: string;
};

const ExpandButton = ({ expanded, setExpanded, controls }: ExpandButtonProps) => {
  const handleExpand: MouseEventHandler<HTMLButtonElement> = e => {
    setExpanded();
    const button = e.target as HTMLButtonElement;
    button.setAttribute('aria-expanded', (!expanded).toString());
  };
  return (
    <button
      className='underline text-center block w-full text-base bg-bg-secondary rounded-lg py-1'
      aria-controls={controls}
      aria-expanded={expanded}
      onClick={handleExpand}>
      See {expanded ? 'less' : 'more'}
      <span className='sr-only'> transactions</span>
      <span
        className={classNames('relative right-[-.5rem]  border-b-2 border-r-2  border-primary w-2 h-2 inline-block', {
          'rotate-[225deg] top-0': expanded,
          'rotate-45 top-[-.125rem]': !expanded,
        })}></span>
    </button>
  );
};
