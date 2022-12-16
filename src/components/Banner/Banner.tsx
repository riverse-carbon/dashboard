import { useAuth0 } from '@auth0/auth0-react';

import { CartSVG, PhotoPlaceHolderSVG } from 'components/icons';
import Button from 'components/Button';

// TODO:
// 1. Add photo if present

const Banner = (): JSX.Element => {
  const { loginWithRedirect, user, logout } = useAuth0();

  return (
    <div className='[grid-area:banner] sticky top-0 z-20 px-5 bg-primary-100 flex items-center gap-10 text-base shadow-high'>
      <p>Welcome</p>
      {user ? (
        <>
          <Button href='/projects' additionalStyles='ml-auto' icon={<CartSVG />} label='Buy carbon credits' />
          <p className='flex items-center gap-2.5'>
            {`${user.given_name} ${user.family_name}`}
            <PhotoPlaceHolderSVG />
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages*/}
          <Button label='Logout' onClick={() => logout({ returnTo: 'http://localhost:3000' })} />
        </>
      ) : (
        <Button label='Login' onClick={() => loginWithRedirect()} additionalStyles='ml-auto' />
      )}
    </div>
  );
};

export default Banner;
