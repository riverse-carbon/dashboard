import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import { shallow } from 'zustand/shallow';
import getConfig from 'next/config';

import { useUserStore } from 'components/hooks/stores/user';

const { registry_api_url } = getConfig().publicRuntimeConfig;

const AuthGuard = ({ children }) => {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading, error, user } = useAuth0();
  const { user_id, access_token, access_token_updated_at, setUser, setAccessToken } = useUserStore(
    user => ({
      user_id: user.id,
      access_token: user.access_token,
      access_token_updated_at: user.access_token_updated_at,
      setUser: user.setUser,
      setAccessToken: user.setAccessToken,
    }),
    shallow
  );

  useEffect(() => {
    if (isAuthenticated && user_id === 0) {
      // TODO: plug me to server and fix the ID
      setUser({
        id: 1,
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
      });
    }
  }, [isAuthenticated, user_id, user, setUser]);

  useEffect(() => {
    async function retrieveAccessToken() {
      const accessToken = await getAccessTokenSilently({
        audience: registry_api_url,
      });

      setAccessToken(accessToken);
    }

    if (isAuthenticated && (!access_token_updated_at || dayjs().diff(dayjs(access_token_updated_at), 'minute') > 60)) {
      retrieveAccessToken();
    }
  }, [isAuthenticated, access_token_updated_at, getAccessTokenSilently, setAccessToken]);

  if (isLoading || (isAuthenticated && !access_token)) {
    return <h1>Loading info...</h1>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  return (
    <main className='main-container'>
      <h2>Welcome!</h2>
      <p>You have to login to see information</p>
      <div>
        <button className='link-block button-style' onClick={() => loginWithRedirect()}>
          Login
        </button>
      </div>
    </main>
  );
};

export default AuthGuard;
