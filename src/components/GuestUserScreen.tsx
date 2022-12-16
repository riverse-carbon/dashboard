import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';
import Main from './Main';

// TODO: check for not logged user

type GuestUserScreenProps = {
  children?: JSX.Element;
};

function GuestUserScreen({ children }: GuestUserScreenProps) {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

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
      {isAuthenticated ? (
        children
      ) : (
        <>
          <h2>Welcome!</h2>
          <p>You have to login to see information</p>
          <div>
            <Button label='Login' onClick={() => loginWithRedirect()} />
          </div>
        </>
      )}
    </Main>
  );
}

export default GuestUserScreen;
