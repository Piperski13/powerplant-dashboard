const express = require("express");
const loginController = require("../controllers/loginController.js");
const router = express.Router();

router.route("/").get(loginController.showLogin);
router.route("/sign-in").get(loginController.showSignIn);
router.route("/logout").get(loginController.logout);

router.route("/login").post(loginController.login);
router.route("/sign-in").post(loginController.signIn);

module.exports = router;
