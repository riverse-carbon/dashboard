import classNames from 'classnames';

// TODO: extend grid-template-areas to handle various screen width

type GridTemplateAreas = {
  all: string;
  tablet?: string;
  desktop?: string;
};

type WidgetsGridProps = {
  gap?: string;
  gridTemplateAreas: GridTemplateAreas;
  children: JSX.Element;
  additionalStyles?: string;
};

const WidgetsGrid = ({
  children,
  gridTemplateAreas,
  additionalStyles = '',
  gap = '',
}: WidgetsGridProps): JSX.Element => {
  // add variable with grid-areas
  const cssVariables = { '--widgets-grid': gridTemplateAreas.all } as React.CSSProperties;

  return (
    <div
      className={classNames(
        'grid',
        'items-start',
        'grid-cols-8',
        'grid-rows-[min-content,_1fr]',
        '[grid-template-areas:var(--widgets-grid)]',
        {
          [`${gap}`]: gap,
          'gap-5': !gap,
        },
        additionalStyles
      )}
      style={cssVariables}>
      {children}
    </div>
  );
};

export default WidgetsGrid;
