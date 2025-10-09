const express = require("express");
const loginController = require("../controllers/loginController.js");
const router = express.Router();

router.route("/").get(loginController.showLogin);
router.route("/login").post(loginController.loginAuth);
router.route("/logout").get(loginController.logout);

module.exports = router;
