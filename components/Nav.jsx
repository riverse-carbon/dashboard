import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Nav.module.css'
import logo from '../public/icons/logo.svg'
import dashboardImage from '../public/icons/dashboard.svg'
import ordersImage from '../public/icons/orders.svg'

// TODO:
// 1. change disabled links

function Nav () {
  const currentPath = useRouter().asPath

  return (
    /* eslint-disable */
    <header className={styles.header}>
      <nav aria-label='main' className={styles.nav}>
        <ul role='list' className='list'>
          <li className={styles['logo-wrapper']}>
            <a href='https://riverse.io'>
              <Image src={logo} alt='riverse logo' />
            </a>
          </li>
          <li className={styles['nav-list-nested']}>
            <ul role='list' className='list flow-spacer spacer-xs'>
              <li className={currentPath === '/' ? styles.active : ''}>
                <Link href='/'>
                  <a className={styles['link-with-icon']}>
                    <Image src={dashboardImage} alt='' />
                    Dashboard
                  </a>
                </Link>
              </li>{' '}
              <li className={currentPath === '/orders' ? styles.active : ''}>
                <Link href='/orders'>
                  <a className={styles['link-with-icon']}>
                    <Image src={ordersImage} alt='' />
                    Orders
                  </a>
                </Link>
              </li>
              <li className={currentPath === '/checkout' ? styles.active : ''}>
                {/* <Link href='/checkout'> */}
                <a className={styles['link-with-icon'] + ' disabled'}>
                  <Image src={dashboardImage} alt='' />
                  Check out
                </a>
                {/* </Link> */}
              </li>
            </ul>
          </li>
          <li className={styles['nav-list-nested']}>
            <ul role='list' className='list flow-spacer spacer-xs'>
              <li>
                {/* <Link href='#'> */}
                {/* <a
                  className={
                    currentPath === '/api-developers'
                      ? styles.active
                      : 'disabled'
                  }
                >
                  API
                </a> */}
                <a className={styles['link-with-icon'] + ' disabled'}>
                  <Image src={dashboardImage} alt='' />
                  API
                </a>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href='#'> */}
                <a className={styles['link-with-icon'] + ' disabled'}>
                  <Image src={dashboardImage} alt='' />
                  Documentation
                </a>
                {/* <a
                  className={
                    currentPath === '/api-documentation'
                      ? styles.active
                      : 'disabled'
                  }
                >
                  Documentation
                </a> */}
                {/* </Link> */}
              </li>
            </ul>
          </li>
          <li className={styles['nav-list-nested']}>
            <ul role='list' className='list flow-spacer spacer-xs'>
              <li>
                {/* <Link href='/billing'> */}
                <a className={styles['link-with-icon'] + ' disabled'}>
                  <Image src={dashboardImage} alt='' />
                  Billing
                </a>
                {/* <a
                  className={
                    currentPath === '/billing' ? styles.active : 'disabled'
                  }
                >
                  Billing
                </a> */}
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href='/members'> */}
                <a className={styles['link-with-icon'] + ' disabled'}>
                  <Image src={dashboardImage} alt='' />
                  Members
                </a>
                {/* <a
                  className={
                    currentPath === '/members' ? styles.active : 'disabled'
                  }
                >
                  Members
                </a> */}
                {/* </Link> */}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
  /* eslint-enable */
}

export default Nav
