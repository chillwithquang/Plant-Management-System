const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

const MODES = {
  CREATE: 'create',
  GET: 'get',
  MANAGE: 'manage',
  GET_USERS: 'getUsers',
  MANAGE_USERS: 'manageUsers',
};

const allRoles = {
  admin: [MODES.GET_USERS, MODES.MANAGE_USERS, MODES.CREATE, MODES.GET, MODES.MANAGE],
  user: [MODES.CREATE, MODES.GET, MODES.MANAGE],
  guest: [MODES.GET],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  MODES,
  ROLES,
  roles,
  roleRights,
};
