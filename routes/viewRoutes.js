const express = require("express");
const {generateView} = require("../controllers/viewController.js");
const router = express.Router();

router.route("/").get(generateView);

module.exports = router;