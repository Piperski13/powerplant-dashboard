const bcrypt = require("bcryptjs");
const Login = require("../model/loginModel");

async function registerPendingUser(pendingUser) {
  if (!pendingUser) throw new Error("No pending user data");

  const { email, surname, lastname, password } = pendingUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  await Login.addUser(email, hashedPassword, surname, lastname);
}

module.exports = { registerPendingUser };
