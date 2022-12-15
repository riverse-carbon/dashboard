import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from 'styles/Nav.module.css';

import {
  LogoSVG,
  DashboardSVG,
  ProjectsSVG,
  ContributionSVG,
  BillingSVG,
  DocumentationSVG,
  AdminSVG,
  CartSVG
} from 'components/icons';
import NavItem from './link';

// TODO:
// 0. Add index page and move dashboard to /dashboard
// 1. change disabled links
// 2. add aria-current=page!!!

function Nav (): JSX.Element {
  const currentPath = useRouter().asPath;

  return (
    /* eslint-disable */
    <header className='relative z-10 text-base bg-primary-100 shadow-high'>
      <nav aria-label='main' className='sticky left-0 top-0 bottom-0 w-full h-screen pb-md'>
        <ul role='list' className='h-full flex flex-col'>
          <li className='grid h-[5rem] items-center'>
            <Link href='/'>
              <a className='block py-sm px-md'>
                <LogoSVG clrMonochrome={false} className='h-[1.25rem] w-full' />
              </a>
            </Link>
          </li>
          <li>
            <ul role='list' className='list'>
              <NavItem path='/dashboard' currentPath={currentPath} label='Dashboard' icon={<DashboardSVG />} />
              <NavItem path='/projects' currentPath={currentPath} label='Projects' icon={<ProjectsSVG />} />
              <NavItem path='/contribution' currentPath={currentPath} label='Contribution' icon={<ContributionSVG />} />
              <NavItem path='/cart' currentPath={currentPath} label='Cart' icon={<CartSVG />} />
            </ul>
          </li>
          <li className='mt-md'>
            <ul role='list' className='list flow-spacer spacer-xs'>
              <NavItem
                // path='/billing'
                path='#'
                currentPath={currentPath}
                label='Billing'
                icon={<BillingSVG />}
              />
              <NavItem
                // path='/documentation'
                path='#'
                currentPath={currentPath}
                label='Documentation'
                icon={<DocumentationSVG />}
              />
              <NavItem path='/admin' currentPath={currentPath} label='Admin' icon={<AdminSVG />} />
            </ul>
          </li>
          <li className='mt-auto mx-auto'>
            <a href='mailto:support@riverse.io?subject=Platform%help' className='button-style link-block'>
              Need help?
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
  /* eslint-enable */
}

export default Nav;
