import { useAuth0 } from '@auth0/auth0-react';
import getConfig from 'next/config';

import { CartSVG, GlobeSVG, PhotoPlaceHolderSVG } from 'components/icons';
import Button from 'components/Button';
import { useUserStore } from 'components/hooks/stores/user';
import { useOrganisationStore } from 'components/hooks/stores/organisation';

const { webapp_log_out_url } = getConfig().publicRuntimeConfig;

const Banner = (): JSX.Element => {
  const { loginWithRedirect, user, logout } = useAuth0();
  const reset_user = useUserStore(user => user.reset);
  const reset_orga = useOrganisationStore(orga => orga.reset);

  return (
    <div className='[grid-area:banner] sticky top-0 z-20 px-5 bg-primary-100 flex items-center gap-10 text-base shadow-high'>
      {user ? (
        <>
          <p>Welcome</p>
          <Button href='/projects' additionalStyles='ml-auto' icon={<CartSVG />} label='Buy carbon credits' />
          <p className='flex items-center gap-2.5'>
            {`${user.given_name || ''} ${user.family_name || ''}`}
            <PhotoPlaceHolderSVG />
          </p>
          <Button
            label='Logout'
            onClick={() => {
              reset_user();
              reset_orga();
              logout({ returnTo: webapp_log_out_url });
            }}
          />
        </>
      ) : (
        <>
          <Button
            additionalStyles='ml-auto text-primary bg-primary-200'
            href='http://www.riverse.io'
            label='Riverse.io'
            type='external'
            icon={<GlobeSVG />}
          />
          <Button label='Log in' onClick={() => void loginWithRedirect()} />
        </>
      )}
    </div>
  );
};

export default Banner;
