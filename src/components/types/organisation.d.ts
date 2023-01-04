export type Organisation = {
  id: number;
  name: string;
  logo: string;
  country?: string;
  registration_number?: string;
  vat_number?: string;
  description?: string;
  website_url?: string;
  type: 'DEVELOPER' | 'BUYER'
};
