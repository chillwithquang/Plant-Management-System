const MODES = {
  CREATE: 'create',
  GET: 'get',
  MANAGE: 'manage',
  GET_USERS: 'getUsers',
  MANAGE_USERS: 'manageUsers',
};

const allRoles = {
  user: [MODES.CREATE, MODES.GET, MODES.MANAGE],
  admin: [MODES.GET_USERS, MODES.MANAGE_USERS, MODES.CREATE, MODES.GET, MODES.MANAGE],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  MODES,
  roles,
  roleRights,
};
