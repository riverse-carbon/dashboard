import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

// TODO: check for not logged user

function GuestUserScreen ({ children }) {
  const { user, error, isLoading } = useUser()
  
  const currentPath = useRouter().asPath  

  if (isLoading) return <h1>Loading info...</h1>
  if (error) return <div>{error.message}</div>
  if (user) return children


  return (
    <main className='main-container '>
      <h2>Welcome!</h2>
      <p>You have to login to see information</p>
      <div>
        <a className='link-block button-style' href={`/api/auth/login?returnTo=${currentPath}`}>
          Login
        </a>
      </div>
    </main>
  )
}

export default GuestUserScreen
