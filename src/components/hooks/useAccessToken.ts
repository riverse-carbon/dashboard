import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAccessToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [access_token, setAccessToken] = useState<string>();

  useEffect(() => {
    async function retrieveAccessToken() {
      const accessToken = await getAccessTokenSilently({
        audience: 'http://localhost:4242',
      });

      setAccessToken(accessToken);
    }

    if (isAuthenticated) {
      retrieveAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return access_token;
};
