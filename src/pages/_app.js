import '../styles/globals.css'
// import * as dotenv from 'dotenv'
// import * as fs from 'fs'
// dotenv.config({ debug: true })
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import { UserProvider } from '@auth0/nextjs-auth0'
import GuestUserScreen from '../components/GuestUserScreen'
import { CartProvider } from '../components/forms/cart'

function MyApp ({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider>
        <div className='app container'>
          <Nav />
          <Banner />
          <GuestUserScreen>
            <Component {...pageProps} />
          </GuestUserScreen>
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp
