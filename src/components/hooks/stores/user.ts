import create from 'zustand';
import { persist } from 'zustand/middleware';

import { type User } from 'components/types/user';

const default_user: User = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  role: 'VIEWER',
  access_token: undefined,
};

type StoreUser = User & {
  access_token_updated_at?: number;
  setUser: (user: User) => void;
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
