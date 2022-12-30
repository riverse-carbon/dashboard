import { useAuth0 } from '@auth0/auth0-react';
import classNames from 'classnames';

type MainProps = {
  children?: JSX.Element;
  additionalStyles?: string;
};

const Main = ({ additionalStyles, children }: MainProps): JSX.Element => {
  const { isAuthenticated } = useAuth0();
  return (
    // <main className={`main-container ${pageStyles.projects}`}>
    <main
      className={classNames(
        'w-full',
        'max-h-[calc(100vh_-_5rem)]',
        'mx-auto',
        'px-5',
        'py-16',
        'overflow-auto',
        '2xl:px-[2.5vw]',
        additionalStyles,
        {
          '[grid-area:main]': isAuthenticated,
          'col-span-2': !isAuthenticated,
        }
      )}>
      {children}
    </main>
  );
};

export default Main;
