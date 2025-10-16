const express = require("express");
const {
  showSignIn,
  showLogin,
  signIn,
  login,
  logout,
  validateUser,
} = require("../controllers/loginController");

const router = express.Router();

router.route("/").get(showLogin);
router.route("/sign-in").get(showSignIn);
router.route("/logout").get(logout);

router.route("/login").post(login);
router.route("/sign-in").post(validateUser, signIn);

module.exports = router;
