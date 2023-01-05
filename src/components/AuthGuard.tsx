import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import shallow from 'zustand/shallow';
import getConfig from 'next/config';
import { useMutation } from '@tanstack/react-query';

import { useUserStore } from 'components/hooks/stores/user';
import { getUser } from 'components/api/users';
import { useOrganisationStore } from 'components/hooks/stores/organisation';
import useRedirectRules from 'components/hooks/routes/useRedirectRoules';

import Main from './Main';
import Button from './Button';

const { registry_api_url } = getConfig().publicRuntimeConfig;

type AuthGuardProps = {
  children: JSX.Element;
};

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
  const { shouldRedirect, isPublicPath } = useRedirectRules();
  const { user_id, access_token, access_token_updated_at, setUser, setAccessToken } = useUserStore(
    user => ({
      user_id: user.id,
      access_token: user.access_token,
      access_token_updated_at: user.access_token_updated_at,
      setUser: user.setUser,
      setAccessToken: user.setAccessToken
    }),
    shallow
  );
  const setOrganisation = useOrganisationStore(orga => orga.setOrganisation);

  const get_user_mutation = useMutation(getUser, {
    onSuccess: data => {
      const user = {
        ...data.user,
        organisation: undefined
      };
      const organisation = data.user.organisation;

      delete user.organisation;
      setUser(user);
      setOrganisation(organisation);
    }
  });

  useEffect(() => {
    async function retrieveAccessToken () {
      const accessToken = await getAccessTokenSilently({
        audience: registry_api_url
      });

      setAccessToken(accessToken);
    }

    if (isAuthenticated && (!access_token_updated_at || dayjs().diff(dayjs(access_token_updated_at), 'minute') > 60)) {
      void retrieveAccessToken();
    }
  }, [isAuthenticated, access_token_updated_at, getAccessTokenSilently, setAccessToken]);

  useEffect(() => {
    if (isAuthenticated && user_id === 0 && get_user_mutation.isIdle && access_token) {
      void get_user_mutation.mutate();
    }
  }, [isAuthenticated, user_id, get_user_mutation, access_token]);

  if (isLoading || (isAuthenticated && !access_token) || shouldRedirect()) {
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
