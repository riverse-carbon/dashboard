import Link from 'next/link';

type NavItemProps = {
  path: string;
  currentPath: string;
  label: string;
  icon?: JSX.Element;
};

const NavItem = ({ path, currentPath, label, icon }: NavItemProps): JSX.Element => {
  // if path is index => check for string equality, if not => check if path starts with current path
  const isCurrent = path === '/' ? currentPath === path : currentPath.startsWith(path);
  const currentClass = isCurrent ? 'bg-primary-200' : '';
  const disabledClass = path === '#' ? 'opacity-75' : '';
  return (
    <li className={`hover:bg-bg-secondary motion-safe:transition-colors ${currentClass} ${disabledClass}`}>
      <Link href={path}>
        <a
          aria-current={currentPath === path ? 'page' : 'false'}
          className={`flex items-center gap-2.5 p-5 no-underline ${disabledClass}`}>
          {icon}
          {label}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
