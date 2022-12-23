import { type AppType } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getConfig from 'next/config';

import '@fontsource/dm-sans';
import '@fontsource/noto-serif';
import 'styles/globals.css';

import Nav from 'components/Nav';
import Banner from 'components/Banner';
import AuthGuard from 'components/AuthGuard';
import { CartProvider } from 'components/forms/cart';

const queryClient = new QueryClient();
const { auth0_domain, auth0_client_id, registry_api_url, webapp_url } = getConfig().publicRuntimeConfig;

const MyApp: AppType = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain={auth0_domain}
      clientId={auth0_client_id}
      redirectUri={webapp_url}
      audience={registry_api_url}
      cacheLocation='localstorage'>
      <CartProvider>
        <div className='relative grid [grid-template-areas:"header_banner"_"header_main"] grid-cols-[fit-content(12rem)_1fr] grid-rows-[5rem_1fr]'>
          <Nav />
          <Banner />
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </div>
      </CartProvider>
    </Auth0Provider>
  </QueryClientProvider>
);

export default MyApp;
