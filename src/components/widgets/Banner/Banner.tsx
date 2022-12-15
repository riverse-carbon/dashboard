import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import { CartSVG, PhotoPlaceHolderSVG } from 'components/icons';

// TODO:
// 1. Add photo if present

const Banner = (): JSX.Element => {
  const { user } = useUser();

  const currentPath = useRouter().asPath;

  return (
    <div className='banner sticky top-0 z-20 px-md bg-primary-100 flex items-center gap-lg text-base shadow-high'>
      <p>Welcome</p>
      {user ? (
        <>
          <Link href='/projects'>
            <a className='button with-icon ml-auto'>
              <CartSVG />
              Buy carbon credits
            </a>
          </Link>
          <p className='flex items-center gap-sm'>
            {`${user.given_name} ${user.family_name}`}
            <PhotoPlaceHolderSVG />
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages*/}
          <a href='/api/auth/logout' className='button'>
            Logout
          </a>
        </>
      ) : (
        /* eslint-disable-next-line @next/next/no-html-link-for-pages*/
        <a href={`/api/auth/login?returnTo=${currentPath}`} className='button  ml-auto'>
          Login
        </a>
      )}
    </div>
  );
};

export default Banner;
