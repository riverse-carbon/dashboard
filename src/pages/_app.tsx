import { type AppType } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import '@fontsource/dm-sans';
import 'styles/globals.css';

import Nav from 'components/Nav';
import Banner from 'components/Banner';
import GuestUserScreen from 'components/GuestUserScreen';
import { CartProvider } from 'components/forms/cart';

const MyApp: AppType = ({ Component, pageProps }) => (
  <UserProvider>
    <CartProvider>
      <div className='app'>
        <Nav />
        <Banner />
        <GuestUserScreen>
          <Component {...pageProps} />
        </GuestUserScreen>
      </div>
    </CartProvider>
  </UserProvider>
);

export default MyApp;
