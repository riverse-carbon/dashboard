import classNames from 'classnames';
import Link from 'next/link';

type DefaultProps = {
  label: string;
  icon?: JSX.Element | undefined;
  children?: JSX.Element;
  additionalStyles?: string;
};

type ButtonProps = DefaultProps & {
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  controls?: string;
};

type AnchorProps = DefaultProps & {
  href: string;
  ariaCurrent?: 'page' | 'false';
  type?: 'internal' | 'external';
  target?: '_blank' | '_self';
};

const Button = (props: AnchorProps | ButtonProps): JSX.Element => {
  const { label, icon, children, additionalStyles } = props;
  const styles = classNames(
    'border-[.125em]',
    'border-primary',
    'rounded-lg',
    'shadow-md',
    'text-base',
    'leading-[1.1]',
    'font-medium',
    'py-[0.5em]',
    'px-[1em]',
    'text-primary-100',
    'bg-primary',
    'no-underline',
    'cursor-pointer',
    'transition',
    'hover:text-primary',
    'hover:bg-primary-100',
    'disabled:sepia',
    { 'flex items-center gap-2.5': icon !== undefined },
    additionalStyles
  );
  if ('href' in props) {
    const { href, type, target } = props;
    if (type === 'external') {
      return (
        <a href={href} className={styles} target={'_blank' && target} rel='noreferrer'>
          {icon}
          {label}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} target={'_self' && target}>
        <a className={styles} aria-current={props.ariaCurrent}>
          {icon}
          {label}
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button className={styles} aria-controls={props.controls} disabled={props.disabled} onClick={props.onClick}>
      {icon}
      {label}
      {children}
    </button>
  );
};

export default Button;
