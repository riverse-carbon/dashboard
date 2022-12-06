import getById from './getById'

const verifyUserEmail = async (base, userId, userEmail) => {
  var usersTable = 'tblG56b6iiigWe8kI'

  var userFromDB = await getById(base, usersTable, userId)

  if (!userFromDB || !userEmail === userFromDB.fields.email) {
    return false
  }

  return userFromDB
}

export default verifyUserEmail
