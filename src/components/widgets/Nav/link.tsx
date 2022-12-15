import Link from 'next/link';

type NavItemProps = {
  path: string;
  currentPath: string;
  label: string;
  icon?: JSX.Element;
};

const NavItem = ({ path, currentPath, label, icon }: NavItemProps): JSX.Element => {
  const currentClass = currentPath.startsWith(path) ? 'bg-primary-200' : '';
  const disabledClass = path === '#' ? 'opacity-75' : '';
  return (
    <li className={`hover:bg-primary-300 motion-safe:transition-colors ${currentClass} ${disabledClass}`}>
      <Link href={path}>
        <a
          aria-current={currentPath === path ? 'page' : 'false'}
          className={`with-icon p-md no-underline ${disabledClass}`}>
          {icon}
          {label}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
