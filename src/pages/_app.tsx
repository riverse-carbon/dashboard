import { type AppType } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
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
    <UserProvider>
      <CartProvider>
        <div className='relative grid [grid-template-areas:"header_banner"_"header_main"] grid-cols-[fit-content(12rem)_1fr] grid-rows-[5rem_1fr]'>
          <Nav />
          <Banner />
          <GuestUserScreen>
            <Component {...pageProps} />
          </GuestUserScreen>
        </div>
      </CartProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default MyApp;
