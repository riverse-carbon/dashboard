import Image from 'next/future/image'
import { useUser } from '@auth0/nextjs-auth0'
import styles from '../styles/Banner.module.css'
import photoPlaceholder from '../public/photo-placeholder.svg'
import CardSVG from '../public/icons/CardSVG'

// TODO:
// 1. DRY returned HTML
// 2. login/out buttons
// 3. contact button (!href)

function Banner () {
  const { user, error, isLoading } = useUser()

  if (user)
    return (
      <div className={`${styles.banner} banner`}>
        <p className={styles.greeting}>Welcome</p>
        {/* <div className={styles['email-photo-wrapper']}> */}
        <a
          href='/api/auth/logout'
          className={`${styles['contact-button']} button-style link-with-icon`}
        >
          <CardSVG />
          Buy carbon credits
        </a>
        <div className={styles.email}>{user.email}</div>
        <Image className={styles.photo} src={photoPlaceholder} alt='' />
      </div>
    )

  return (
    <div className={`${styles.banner} banner`}>
      <p className={styles.greeting}>Welcome</p>
      <a
        href='#'
        className={`${styles['contact-button']} button-style link-with-icon`}
      >
        <CardSVG />
        Buy carbon credits
      </a>
      <a href='/api/auth/login' className='button-style'>
        Login
      </a>
    </div>
  )
}

export default Banner
