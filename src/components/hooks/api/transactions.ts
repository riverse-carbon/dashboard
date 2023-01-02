import { useQuery } from '@tanstack/react-query';
import { getTransactions } from 'components/api/transactions';
import type { TransactionsSortedByMonth } from 'components/types/transactions';

export const transactions_keys = {
  transactions: ['transactions'] as const,
  getTransactions: () => [...transactions_keys.transactions, 'all'] as const,
  getTransactionById: (id: string) => [...transactions_keys.transactions, id] as const,
};

export const useTransactions = (initialTransactions: TransactionsSortedByMonth[] = []) => {
  const queryFunction = async () => {
    const res = await getTransactions();
    return res;
  };

  return useQuery({
    queryKey: transactions_keys.getTransactions(),
    queryFn: queryFunction,
    initialData: initialTransactions,
    // delete enabled:false after replacing fake data by the real one
    enabled: !initialTransactions.length,
  });
};
