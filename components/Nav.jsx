import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Nav.module.css'
import LogoSVG from '../public/icons/LogoSVG'
import DashboardSVG from '../public/icons/DashboardSVG'
import ProjectsSVG from '../public/icons/ProjectsSVG'
import ContributionSVG from '../public/icons/ContributionSVG'
import CarbonCreditsSVG from '../public/icons/CarbonCreditsSVG'
import BillingSVG from '../public/icons/BillingSVG'
import DocumentationSVG from '../public/icons/DocumentationSVG'
import MembersSVG from '../public/icons/MembersSVG'

// TODO:
// 1. change disabled links
// 2. add aria-current=page!!!

function Nav () {
  const currentPath = useRouter().asPath

  return (
    /* eslint-disable */
    <header className={styles.header + ' shadow-elevation-xl'}>
      <nav aria-label='main' className={styles.nav}>
        <ul role='list' className='list'>
          <li className={styles['logo-wrapper']}>
            <a href='https://riverse.io'>
              <LogoSVG clrMonochrome={false} />
            </a>
          </li>
          <li className={styles['nav-list-nested']}>
            <ul role='list' className='list'>
              <li className={currentPath === '/' ? styles.active : ''}>
                <Link href='/'>
                  <a className={'link-with-icon'}>
                    <DashboardSVG />
                    Dashboard
                  </a>
                </Link>
              </li>{' '}
              <li
                className={
                  currentPath.startsWith('/projects') ? styles.active : ''
                }
              >
                <Link href='/projects'>
                  <a className={'link-with-icon'}>
                    <ProjectsSVG />
                    Projects
                  </a>
                </Link>
              </li>
              <li
                className={currentPath === '/contribution' ? styles.active : ''}
              >
                <Link href='/contribution'>
                  <a className={'link-with-icon'}>
                    <ContributionSVG />
                    Contribution
                  </a>
                </Link>
              </li>
              <li
                className={
                  currentPath === '/carbon-credits' ? styles.active : ''
                }
              >
                <Link href='/carbon-credits'>
                  <a className={'link-with-icon'}>
                    <CarbonCreditsSVG />
                    Carbon credits
                  </a>
                </Link>
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
                <a className={'link-with-icon' + ' disabled'}>
                  <BillingSVG />
                  Billing
                </a>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href='#'> */}
                <a className={'link-with-icon' + ' disabled'}>
                  <DocumentationSVG />
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
              <li className={currentPath === '/members' ? styles.active : ''}>
                <Link href='/members'>
                  <a className={'link-with-icon'}>
                    <MembersSVG />
                    Members
                  </a>
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles['contact-button-wrapper']}>
            <Link href='#'>
              <a className='button-style link-block'>Need help?</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
  /* eslint-enable */
}

export default Nav
