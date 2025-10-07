const express = require("express");
const viewController = require("../controllers/viewController.js");
const router = express.Router();

router.route("/recordsViewPage").get(viewController.generateView);
router.route("/welcome").get(viewController.showWelcome);

module.exports = router;
