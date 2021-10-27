const { User } = require('./models');
const { getUserByEmail } = require('./services/user.service');

const adminAccount = {
  name: 'adminquang',
  email: 'admin@gmail.com',
  password: 'admin@admin123',
  role: 'admin',
};

(async function () {
  const user = await getUserByEmail(adminAccount.email);
  if (user) return;
  User.create(adminAccount);
})();

// User.create(adminAccount, (err) => {
//   if (err) {
//     throw err;
//   }
// });
