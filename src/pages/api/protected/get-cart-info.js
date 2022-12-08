import { getSession } from '@auth0/nextjs-auth0'

const getCartInfo = (req, res) => {
  var session = getSession(req, res)

  var currentUserId = session.user['https://registry.riverse.io/userId'] || ''
}

export default getCartInfo
