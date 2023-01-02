import { request } from './request';

export function getTransactions() {
  return request({
    method: 'GET',
    url: '/v1/transactions',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getTransactionById(transaction_id: string) {
  return request({
    method: 'GET',
    url: `/v1/transactions/${transaction_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
