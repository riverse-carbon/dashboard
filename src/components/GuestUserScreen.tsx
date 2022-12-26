import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Button from './Button';
import Main from './Main';

// TODO: check for not logged user

type GuestUserScreenProps = {
  children?: JSX.Element;
};

function GuestUserScreen({ children }: GuestUserScreenProps) {
  const { user, error, isLoading } = useUser();

  const currentPath = useRouter().asPath;

  if (isLoading)
    return (
      <Main>
        <h1>Loading info...</h1>
      </Main>
    );
  if (error)
    return (
      <Main>
        <div>{error.message}</div>
      </Main>
    );

  return (
    <Main>
      {user ? (
        children
      ) : (
        <>
          <h2>Welcome!</h2>
          <p>You have to login to see information</p>
          <div>
            <Button label='Login' type='external' target='_self' href={`/api/auth/login?returnTo=${currentPath}`} />
          </div>
        </>
      )}
    </Main>
  );
}

export default GuestUserScreen;
