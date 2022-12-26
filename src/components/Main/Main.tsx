import classNames from 'classnames';

type MainProps = {
  children?: JSX.Element;
  additionalStyles?: string;
};

const Main = ({ additionalStyles, children }: MainProps): JSX.Element => {
  return (
    // <main className={`main-container ${pageStyles.projects}`}>
    <main
      className={classNames(
        '[grid-area:main]',
        'w-full',
        'max-h-[calc(100vh_-_5rem)]',
        'mx-auto',
        'px-5',
        'py-16',
        'overflow-auto',
        '2xl:px-[2.5vw]',
        additionalStyles
      )}>
      {children}
    </main>
  );
};

export default Main;
