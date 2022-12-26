import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import { CartSVG, PhotoPlaceHolderSVG } from 'components/icons';
import Button from 'components/Button';

// TODO:
// 1. Add photo if present

const Banner = (): JSX.Element => {
  const { user } = useUser();

  const currentPath = useRouter().asPath;

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
          <Button label='Logout' href='/api/auth/logout' type='external' target='_self' />
        </>
      ) : (
        /* eslint-disable-next-line @next/next/no-html-link-for-pages*/
        <Button
          label='Login'
          type='external'
          target='_self'
          href={`/api/auth/login?returnTo=${currentPath}`}
          additionalStyles='ml-auto'
        />
      )}
    </div>
  );
};

export default Banner;
