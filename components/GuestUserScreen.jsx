import { useUser } from '@auth0/nextjs-auth0'

function GuestUserScreen ({ children }) {
  const { user, error, isLoading } = useUser()

  if (user) return children

  return (
    <div>
      <h2>Welcome, traveler!</h2>
      {isLoading && <div>Loading info...</div>}
      {error && <div>{error.message}</div>}
      <p>You have to login to see information</p>
    </div>
  )
}

export default GuestUserScreen
