import create from 'zustand';
import { persist } from 'zustand/middleware';

import { type User } from 'components/types/user';

const default_user: Omit<User, 'organisation'> = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  role: 'VIEWER',
  access_token: undefined,
  fk_organisation_id: 0
};

type StoreUser = Omit<User, 'organisation'> & {
  access_token_updated_at?: number;
  setUser: (user: Omit<User, 'organisation'>) => void;
  setAccessToken: (access_token: string) => void;
  reset: () => void;
};

export const useUserStore = create<StoreUser>()(
  persist(
    set => ({
      ...default_user,
      setUser: user => set(state => ({ ...state, ...user })),
      reset: () => set({ ...default_user, access_token_updated_at: undefined }),
      setAccessToken: access_token =>
        set(state => ({
          ...state,
          access_token,
          access_token_updated_at: Date.now(),
        })),
    }),
    { name: 'user-store' }
  )
);
