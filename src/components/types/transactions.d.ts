import type { Project } from './project';

export type ProjectFromTransaction = Pick<Project, 'tagline' | 'sectors' | 'name' | 'cover_picture'> & {
  contribution: number;
  creditsAvailable: number;
  id: string;
};

export type Transaction = {
  id: string;
  carbonAmount: number;
  credits: number;
  buyer: string;
  type: 'Reduction & Avoidance' | 'Removal';
  purchaseDate: string;
  validationDate: string;
  project: ProjectFromTransaction;
};

export type TransactionsSortedByMonth = {
  month: string;
  total: number;
  transactions: Transaction[];
};
