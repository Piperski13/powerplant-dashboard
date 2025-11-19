const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const ForgotPassword = require("../model/forgotPasswordModel.js");
const Users = require("../model/usersModel.js");
const sendResetPasswordEmail = require("../utils/resetPasswordEmail.js");

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await ForgotPassword.addPasswordReset(email, hashedToken, expiresAt);

  const resetLink = `${process.env.RESET_LINK_HOST}/forgot/reset-password/${token}`;

  await sendResetPasswordEmail(email, resetLink);

  res.render("forgot-password-success");
};

const showResetForm = async (req, res) => {
  const token = req.params.token;

  return res.render("reset-password", { token });
};

const showForgotPage = async (req, res) => {
  return res.render("forgot-password");
};

const handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const result = await ForgotPassword.validPasswordResetToken();

  if (result.length === 0) {
    return res.send("Reset link invalid or expired.");
  }

  const resetEntry = result[0];
  const tokenMatches = await bcrypt.compare(token, resetEntry.token);

  if (!tokenMatches) {
    return res.send("Invalid token.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.updatePassword(hashedPassword, resetEntry.email);

  await ForgotPassword.removeToken(resetEntry.email);

  req.session.successMessage = "✅ Password changed successfully!";
  res.redirect("/");
};

module.exports = {
  handleForgotPassword,
  showResetForm,
  showForgotPage,
  handleResetPassword,
};
