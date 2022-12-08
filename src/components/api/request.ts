import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

type RequestOptions = AxiosRequestConfig & {
  raw_response?: boolean;
};

export async function request(options: RequestOptions) {
  try {
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
