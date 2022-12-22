import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

import { useUserStore } from 'components/hooks/stores/user';

type RequestOptions = AxiosRequestConfig & {
  no_auth?: boolean
  raw_response?: boolean;
};

export async function request(options: RequestOptions) {
  try {
    if (!options.no_auth) {
      const access_token = useUserStore.getState().access_token;

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    const response = await axios.request(options);

    if (options.raw_response) {
      return response;
    }
    return response.data;
  } catch (except) {
    const err = except as Error | AxiosError;

    console.error(err);
    throw err;
  }
}
