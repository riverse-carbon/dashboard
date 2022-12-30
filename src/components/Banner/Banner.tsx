import { useAuth0 } from '@auth0/auth0-react';
import getConfig from 'next/config';

import { CartSVG, PhotoPlaceHolderSVG } from 'components/icons';
import Button from 'components/Button';
import { useUserStore } from 'components/hooks/stores/user';

const { webapp_url } = getConfig().publicRuntimeConfig;

const Banner = (): JSX.Element => {
  const { loginWithRedirect, user, logout } = useAuth0();
  const reset = useUserStore(user => user.reset);

  return (
    <div className='[grid-area:banner] sticky top-0 z-20 px-5 bg-primary-100 flex items-center gap-10 text-base shadow-high'>
      <p>Welcome</p>
      {user ? (
        <>
          <Button href='/projects' additionalStyles='ml-auto' icon={<CartSVG />} label='Buy carbon credits' />
          <p className='flex items-center gap-2.5'>
            {`${user.given_name || ''} ${user.family_name || ''}`}
            <PhotoPlaceHolderSVG />
          </p>
          <Button
            label='Logout'
            onClick={() => {
              reset();
              logout({ returnTo: webapp_url });
            }}
          />
        </>
      ) : (
        <Button label='Login' onClick={() => void loginWithRedirect()} additionalStyles='ml-auto' />
      )}
    </div>
  );
};

export default Banner;
