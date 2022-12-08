import { getSession } from '@auth0/nextjs-auth0';
import Airtable from 'airtable';
import verifyUserEmail from '../../../components/db/verifyUserEmail';

const createNewUser = async (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('apptpGktGToVH41dj');

  try {
    var session = getSession(req, res);
    var currentUserId = session.user['https://registry.riverse.io/userId'] || '';
    var currentUserEmail = session.user.email;

    var userVerified = await verifyUserEmail(base, currentUserId, currentUserEmail);

    if (!userVerified) {
      res.status(403);
      throw new Error('You do not have permissions to perform this operation');
    }

    var createUserPermissionsByRole = [];
    switch (userVerified.fields.role) {
      case 'admin':
        createUserPermissionsByRole.push('admin', 'validator');
      case 'validator':
        createUserPermissionsByRole.push('buyer', 'viewer');
    }

    var userToAdd = req.body;

    var enoughPermissions = (role, permissionsList) => {
      return permissionsList.includes(role);
    };

    if (!enoughPermissions(userToAdd.role, createUserPermissionsByRole)) {
      res.status(403);
      throw new Error('You can not add user with this role');
    }

    // users table
    const response = await base('tblG56b6iiigWe8kI')
      .create([
        {
          fields: {
            surname: 'John',
            name: 'Doe',
            email: userToAdd.email,
            org: [userVerified.fields.org[0]],
            role: userToAdd.role,
          },
        },
      ])
      .then(records => ({
        success: !!records[0].id,
        email: records[0].fields.email,
      }))
      .catch(err => {
        return err;
      });

    // add unfiltered users by role to the response?

    res.json({ results: response });
  } catch (e) {
    res.json({ error: e.message });
  }
};

export default createNewUser;
