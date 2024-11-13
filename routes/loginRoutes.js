const express = require("express");
const loginController = require("../controllers/loginController.js");
const router = express.Router();

router.route("/").post(loginController.loginAuth);
router.route("/logout").get(loginController.logout);
router.route("/user-data").get(loginController.dynamicalHTML);

module.exports = router;