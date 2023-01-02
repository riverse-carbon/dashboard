import type { Transaction } from 'components/types/transactions';
import type { NextApiRequest, NextApiResponse } from 'next';

const today = new Date();
const todayString = today.toISOString();
const november = new Date();
november.setMonth(10);
const novemberString = november.toISOString();
const october = new Date();
october.setMonth(9);
const octoberString = october.toISOString();

const FAKE_DATA: Transaction[] = [
  {
    id: 'TransactionID1',
    carbonAmount: 3012,
    credits: 50,
    buyer: 'NewOwner',
    type: 'Reduction & Avoidance',
    purchaseDate: todayString,
    validationDate: todayString,
    project: {
      cover_picture: 'https://storage.googleapis.com/riverse/images/projects/be-energy.jpg',
      tagline: 'Be Energy - Car battery reconditionning',
      name: 'Be Energy',
      sectors: ['Waste', 'Industry'],
      contribution: 209,
      id: '1',
      creditsAvailable: 100,
    },
  },
  {
    id: 'TransactionID2',
    carbonAmount: 3013,
    credits: 50,
    buyer: 'NewOwner',
    type: 'Reduction & Avoidance',
    purchaseDate: todayString,
    validationDate: todayString,
    project: {
      cover_picture: 'https://storage.googleapis.com/riverse/images/projects/be-energy.jpg',
      tagline: 'Be Energy - Car battery reconditionning',
      name: 'Be Energy',
      sectors: ['Waste', 'Industry'],
      contribution: 209,
      id: '2',
      creditsAvailable: 100,
    },
  },
  {
    id: 'TransactionID3',
    carbonAmount: 3013,
    credits: 50,
    buyer: 'NewOwner',
    type: 'Reduction & Avoidance',
    purchaseDate: octoberString,
    validationDate: octoberString,
    project: {
      cover_picture: 'https://storage.googleapis.com/riverse/images/projects/manutan-recycling.jpg',
      tagline: 'Weturn - Fiber-to-fiber textile recycling',
      name: 'Weturn',
      sectors: ['Waste', 'Industry'],
      contribution: 1209,
      id: '3',
      creditsAvailable: 100,
    },
  },
  {
    id: 'TransactionID4',
    carbonAmount: 3013,
    credits: 50,
    buyer: 'NewOwner',
    type: 'Reduction & Avoidance',
    purchaseDate: novemberString,
    validationDate: novemberString,
    project: {
      cover_picture: 'https://storage.googleapis.com/riverse/images/projects/manutan-recycling.jpg',
      tagline: 'Weturn - Fiber-to-fiber textile recycling',
      name: 'Weturn',
      sectors: ['Waste', 'Industry'],
      contribution: 1209,
      id: '4',
      creditsAvailable: 100,
    },
  },
  {
    id: 'TransactionID5',
    carbonAmount: 3012,
    credits: 50,
    buyer: 'NewOwner',
    type: 'Reduction & Avoidance',
    purchaseDate: octoberString,
    validationDate: octoberString,
    project: {
      cover_picture: 'https://storage.googleapis.com/riverse/images/projects/be-energy.jpg',
      tagline: 'Be Energy - Car battery reconditionning',
      name: 'Be Energy',
      sectors: ['Waste', 'Industry'],
      contribution: 209,
      id: '5',
      creditsAvailable: 100,
    },
  },
  {
    id: 'TransactionID6',
    carbonAmount: 3012,
    credits: 50,
    buyer: 'NewOwner',
    type: 'Reduction & Avoidance',
    purchaseDate: octoberString,
    validationDate: octoberString,
    project: {
      cover_picture: 'https://storage.googleapis.com/riverse/images/projects/be-energy.jpg',
      tagline: 'Be Energy - Car battery reconditionning',
      name: 'Be Energy',
      sectors: ['Waste', 'Industry'],
      contribution: 209,
      id: '6',
      creditsAvailable: 100,
    },
  },
];

export const getFakeTransactions = () => {
  return { data: FAKE_DATA };
};
export const getFakeTransactionById = (id: string) => {
  const transaction = FAKE_DATA.find(transaction => transaction.id === id);
  return { data: transaction };
};
