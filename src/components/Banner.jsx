import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import styles from 'styles/Banner.module.css';
import photoPlaceholder from '../../public/photo-placeholder.svg';
import { CartSVG } from 'components/icons';

// TODO:
// 1. DRY returned HTML
// 2. login/out buttons
// 3. contact button (!href)

function Banner() {
  const { user } = useUser();

  const currentPath = useRouter().asPath;

  if (user)
    return (
      <div className={`${styles.banner} banner shadow-elevation-xl`}>
        <p className={styles.greeting}>Welcome</p>
        {/* <div className={styles['email-photo-wrapper']}> */}
        <Link href='/projects'>
          <a className={`${styles['contact-button']} button-style link-with-icon`}>
            <CartSVG />
            Buy carbon credits
          </a>
        </Link>
        <div className={styles.email}>
          {user.given_name} {user.family_name}
        </div>
        <Image className={styles.photo} src={photoPlaceholder} alt='' />
        <Link href='/api/auth/logout'>
          <a className={`button-style`}>Logout</a>
        </Link>
      </div>
    );

  return (
    <div className={`${styles.banner} banner`}>
      <p className={styles.greeting}>Welcome</p>

      <a href={`/api/auth/login?returnTo=${currentPath}`} className={`${styles['contact-button']} button-style`}>
        Login
      </a>
    </div>
  );
}

export default Banner;
