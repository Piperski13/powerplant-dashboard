const express = require("express");
const viewController = require("../controllers/viewController.js");
const router = express.Router();

router.route("/recordsViewPage").get(viewController.generateView);
router.route("/welcome").get(viewController.showWelcome);
router.route("/addRecord").get(viewController.showAddRecord);
router.route("/addRecord/:id").get(viewController.showAddRecord);

module.exports = router;
