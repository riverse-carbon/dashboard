import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import shallow from 'zustand/shallow';
import getConfig from 'next/config';

import { useUserStore } from 'components/hooks/stores/user';
import Main from './Main';
import { useRouter } from 'next/router';
import Button from './Button';

const { registry_api_url } = getConfig().publicRuntimeConfig;

type AuthGuardProps = {
  children: JSX.Element;
  publicDirectories?: {
    directories?: string[];
    exactPaths?: string[];
  };
};

const AuthGuard = ({ children, publicDirectories = {} }: AuthGuardProps): JSX.Element => {
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

  const currentPath = useRouter().asPath;
  const isPublicPath = () => {
    if (publicDirectories.directories?.some(publicPath => currentPath.startsWith(publicPath))) {
      return true;
    }
    if (publicDirectories.exactPaths?.some(exactPath => exactPath === currentPath)) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isAuthenticated && user_id === 0) {
      // TODO: plug me to server and fix the ID
      setUser({
        id: 1,
        first_name: user!.given_name!,
        last_name: user!.family_name!,
        email: user!.email!,
        role: 'ADMIN',
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
      void retrieveAccessToken();
    }
  }, [isAuthenticated, access_token_updated_at, getAccessTokenSilently, setAccessToken]);

  if (isLoading || (isAuthenticated && !access_token)) {
    return (
      <Main>
        <h1>Loading info...</h1>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <div>{error.message}</div>
      </Main>
    );
  }

  return (
    <Main>
      {isAuthenticated || isPublicPath() ? (
        children
      ) : (
        <div className='text-xl text-center space-y-5'>
          <h2>Welcome!</h2>
          <p>You have to log in to see information</p>
          <div>
            <Button label='Log in' variant='centered' onClick={() => void loginWithRedirect()} />
          </div>
        </div>
      )}
    </Main>
  );
};

export default AuthGuard;