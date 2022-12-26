import classNames from 'classnames';

// TODO: extend grid-template-areas to handle various screen width

type GridTemplateAreas = {
  all: string;
  tablet?: string;
  desktop?: string;
};

type WidgetsGridProps = {
  gridTemplateAreas: GridTemplateAreas;
  children: JSX.Element;
};

const WidgetsGrid = ({ children, gridTemplateAreas }: WidgetsGridProps): JSX.Element => {
  // add variable with grid-areas
  const cssVariables = { '--widgets-grid': gridTemplateAreas.all } as React.CSSProperties;

  return (
    <div
      className={classNames(
        'grid',
        'gap-5',
        'items-start',
        'grid-cols-8',
        'grid-rows-[min-content,_1fr]',
        '[grid-template-areas:var(--widgets-grid)]'
      )}
      style={cssVariables}>
      {children}
    </div>
  );
};

export default WidgetsGrid;
