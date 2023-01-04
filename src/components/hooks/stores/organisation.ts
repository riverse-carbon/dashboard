import create from 'zustand';
import { persist } from 'zustand/middleware';

import { type Organisation } from 'components/types/organisation';

const default_organisation: Organisation = {
  id: 0,
  name: '',
  logo: '',
  type: 'DEVELOPER',
};

type StoreOrganisation = Organisation & {
  setOrganisation: (orga: Organisation) => void;
  reset: () => void;
};

export const useOrganisationStore = create<StoreOrganisation>()(
  persist(
    set => ({
      ...default_organisation,
      setOrganisation: orga => set(state => ({ ...state, ...orga })),
      reset: () => set({ ...default_organisation }),
    }),
    { name: 'orga-store' }
  )
);
