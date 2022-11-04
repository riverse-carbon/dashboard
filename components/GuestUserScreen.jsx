import { useUser } from '@auth0/nextjs-auth0'

// TODO: check for not logged user

function GuestUserScreen ({ children }) {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading info...</div>
  if (error) return <div>{error.message}</div>
  if (user) {
  }
  return children

  return (
    <main className='main-container'>
      <h2>Welcome, traveler!</h2>
      <p>You have to login to see information</p>
      <div>
        <h3>Login buttons and other stuff</h3>
        <a className='link--block button-style' href='/api/auth/login'>
          Login
        </a>
      </div>
      <div>SOme information about how to use our application</div>
    </main>
  )
}

export default GuestUserScreen
