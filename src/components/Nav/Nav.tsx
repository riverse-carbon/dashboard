import Link from 'next/link';
import { useRouter } from 'next/router';

import NavItem from './link';
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
import Button from 'components/Button';

// TODO:
// 0. Add index page and move dashboard to /dashboard
// 1. change disabled links
// 2. add aria-current=page!!!

function Nav (): JSX.Element {
  const currentPath = useRouter().asPath;

  return (
    /* eslint-disable */
    <header className='[grid-area:header] relative text-base z-10 bg-primary-100 shadow-high'>
      <nav aria-label='main' className='sticky left-0 top-0 bottom-0 w-full h-screen pb-5'>
        <ul role='list' className='h-full flex flex-col'>
          <li className='grid h-[5rem] items-center'>
            <Link href='/'>
              <a className='block py-2.5 px-5'>
                <LogoSVG clrMonochrome={false} className='h-[1.25rem] w-full' />
              </a>
            </Link>
          </li>
          <li>
            <ul role='list'>
              <NavItem path='/' currentPath={currentPath} label='Dashboard' icon={<DashboardSVG />} />
              <NavItem path='/projects' currentPath={currentPath} label='Projects' icon={<ProjectsSVG />} />
              <NavItem path='/contribution' currentPath={currentPath} label='Contribution' icon={<ContributionSVG />} />
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
        </ul>
      </nav>
    </header>
  );
  /* eslint-enable */
}

export default Nav;
