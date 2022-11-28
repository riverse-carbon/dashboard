import Image from 'next/future/image'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import styles from '../styles/Banner.module.css'
import photoPlaceholder from '../public/photo-placeholder.svg'
import CardSVG from '../public/icons/CardSVG'
import { useRouter } from 'next/router'

// TODO:
// 1. DRY returned HTML
// 2. login/out buttons
// 3. contact button (!href)

function Banner () {
  const { user, error, isLoading } = useUser()

  const currentPath = useRouter().asPath

  if (user)
    return (
      <div className={`${styles.banner} banner`}>
        <p className={styles.greeting}>Welcome</p>
        {/* <div className={styles['email-photo-wrapper']}> */}
        <Link href='/projects'>
          <a
            className={`${styles['contact-button']} button-style link-with-icon`}
          >
            <CardSVG />
            Buy carbon credits
          </a>
        </Link>
        <div className={styles.email}>{user.email}</div>
        <Image className={styles.photo} src={photoPlaceholder} alt='' />
        <a href='/api/auth/logout' className={`button-style`}>
          Logout
        </a>
      </div>
    )

  return (
    <div className={`${styles.banner} banner`}>
      <p className={styles.greeting}>Welcome</p>

      <a
        href={`/api/auth/login?returnTo=${currentPath}`}
        className={`${styles['contact-button']} button-style`}
      >
        Login
      </a>
    </div>
  )
}

export default Banner
