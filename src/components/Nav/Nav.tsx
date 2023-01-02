import classNames from 'classnames';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  LogoSVG,
  DashboardSVG,
  ProjectsSVG,
  ContributionSVG,
  BillingSVG,
  DocumentationSVG,
  AdminSVG,
  CartSVG,
  TransferSVG,
} from 'components/icons';
import Button from 'components/Button';

import NavItem from './link';

function Nav(): JSX.Element {
  const { isAuthenticated } = useAuth0();
  const currentPath = useRouter().asPath;

  return (
    /* eslint-disable */
    <header
      className={classNames('relative text-base z-10 bg-primary-100 shadow-high', {
        '[grid-area:header]': isAuthenticated,
      })}>
      <p id='nav_label' className='sr-only'>
        Main
      </p>
      <nav
        aria-labelledby='nav_label'
        className={classNames('sticky', 'left-0', 'top-0', 'w-full', {
          'h-screen bottom-0 pb-5': isAuthenticated,
        })}>
        <ul role='list' className='h-full flex flex-col'>
          <li className='grid h-[5rem] items-center'>
            <Link href={isAuthenticated ? '/dashboard' : '/'}>
              <a className='block py-2.5 px-5'>
                <LogoSVG clrMonochrome={false} className='h-[1.25rem] w-full' />
              </a>
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <ul role='list'>
                  <NavItem path='/dashboard' currentPath={currentPath} label='Dashboard' icon={<DashboardSVG />} />
                  <NavItem path='/projects' currentPath={currentPath} label='Projects' icon={<ProjectsSVG />} />
                  <NavItem path='#' currentPath={currentPath} label='Contribution' icon={<ContributionSVG />} />
                  <NavItem
                    path='/transactions'
                    currentPath={currentPath}
                    label='Public registry'
                    icon={<TransferSVG />}
                  />
                  <NavItem path='/cart' currentPath={currentPath} label='Cart' icon={<CartSVG />} />
                </ul>
              </li>
              <li className='mt-5'>
                <ul role='list'>
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
              <li className='mt-auto mx-5'>
                <Button
                  label='Need help?'
                  href='mailto:support@riverse.io?subject=Platform%help'
                  additionalStyles='block text-center'
                />
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
  /* eslint-enable */
}

export default Nav;
