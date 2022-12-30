import classNames from 'classnames';

type WidgetWrapperProps = {
  children: React.ReactElement;
  position?: 'static' | 'absolute' | 'sticky' | 'relative';
  inset?: string;
  additionalStyles?: string;
  variant?: 'primary' | 'inverted' | 'transparent';
  areaName?: string;
};

const WidgetWrapper = ({
  children,
  additionalStyles,
  position = 'static',
  inset = '0 auto auto auto',
  variant = 'primary',
  areaName = '',
}: WidgetWrapperProps): JSX.Element => {
  const styles = classNames(
    'p-5',
    'rounded-xl',
    'space-y-5',
    position,
    '[grid-area:var(--widget-area)]',
    {
      'text-primary bg-primary-100 shadow-medium': variant === 'primary',
      'text-primary-100 bg-primary shadow-medium': variant === 'inverted',
      [inset]: position !== 'static',
    },
    additionalStyles
  );

  // add variable with grid-area name
  const cssVariables = { '--widget-area': areaName } as React.CSSProperties;

  return (
    <section className={styles} style={cssVariables}>
      {children}
    </section>
  );
};

export default WidgetWrapper;
