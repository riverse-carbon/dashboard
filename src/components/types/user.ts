export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'ADMIN' | 'VALIDATOR' | 'BUYER' | 'VIEWER';
  access_token?: string;
};
