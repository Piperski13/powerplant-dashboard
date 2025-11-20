const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const ForgotPassword = require("../model/forgotPasswordModel.js");
const Users = require("../model/usersModel.js");
const sendResetPasswordEmail = require("../utils/resetPasswordEmail.js");

const { body, validationResult } = require("express-validator");

const validateUser = [
  body("password").isLength({ min: 2 }).withMessage("Password too short"),
];

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await ForgotPassword.addPasswordReset(email, hashedToken, expiresAt);

    const resetLink = `${process.env.RESET_LINK_HOST}/forgot/reset-password/${token}`;

    await sendResetPasswordEmail(email, resetLink);

    res.render("forgot-password-success");
  } catch (error) {
    console.error("Error handling forgot password:", err);

    res.status(500).json({ error: error.message });
  }
};

const showResetForm = async (req, res, next, errors = []) => {
  const token = req.params.token;

  return res.render("reset-password", { token, errors });
};

const showForgotPage = async (req, res) => {
  return res.render("forgot-password");
};

const handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  let validationErrors = validationResult(req).array();

  try {
    if (validationErrors.length > 0) {
      return showResetForm(req, res, [], validationErrors);
    }

    const result = await ForgotPassword.validPasswordResetToken();

    if (result.length === 0) {
      return showResetForm(
        req,
        res,
        [],
        [{ msg: "Reset link invalid or expired." }]
      );
    }

    const resetEntry = result[0];
    const tokenMatches = await bcrypt.compare(token, resetEntry.token);

    if (!tokenMatches) {
      return showResetForm(req, res, [], [{ msg: "Invalid token." }]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.updatePassword(hashedPassword, resetEntry.email);

    await ForgotPassword.removeToken(resetEntry.email);

    req.session.successMessage = "✅ Password changed successfully!";
    res.redirect("/");
  } catch (error) {
    console.error("Error resetting password:", err);
    return showResetForm(
      req,
      res,
      [],
      [{ msg: "An unexpected error occurred. Please try again." }]
    );
  }
};

module.exports = {
  handleForgotPassword,
  showResetForm,
  showForgotPage,
  handleResetPassword,
  validateUser,
};
