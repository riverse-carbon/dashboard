import { type AppType } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@fontsource/dm-sans';
import '@fontsource/noto-serif';
import 'styles/globals.css';

import Nav from 'components/Nav';
import Banner from 'components/Banner';
import GuestUserScreen from 'components/GuestUserScreen';
import { CartProvider } from 'components/forms/cart';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain='riverse-dev.eu.auth0.com'
      clientId='mpZ7c9YpklBs3YGvKLf1DqVCR0pNrzQL'
      redirectUri='http://localhost:3000'
      audience='http://localhost:4242'>
      <CartProvider>
        <div className='relative grid [grid-template-areas:"header_banner"_"header_main"] grid-cols-[fit-content(12rem)_1fr] grid-rows-[5rem_1fr]'>
          <Nav />
          <Banner />
          <GuestUserScreen>
            <Component {...pageProps} />
          </GuestUserScreen>
        </div>
      </CartProvider>
    </Auth0Provider>
  </QueryClientProvider>
);

export default MyApp;
