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
import CardSVG from '../public/icons/CartSVG'

// TODO:
// 1. change disabled links
// 2. add aria-current=page!!!
// 3. use separate components for links (so href is same as current path)

function Nav () {
  const currentPath = useRouter().asPath

  return (
    /* eslint-disable */
    <header className={styles.header + ' shadow-elevation-xl'}>
      <nav aria-label='main' className={styles.nav}>
        <ul role='list' className='list'>
          <li className={styles['logo-wrapper']}>
            <Link href='/'>
              <a>
                <LogoSVG clrMonochrome={false} />
              </a>
            </Link>
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
              <li className={currentPath === '/cart' ? styles.active : ''}>
                <Link href='/cart'>
                  <a className={'link-with-icon'}>
                    <CardSVG />
                    Cart
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
            <a
              href='mailto:support@riverse.io?subject=Platform%help'
              className='button-style link-block'
            >
              Need help?
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
  /* eslint-enable */
}

export default Nav
