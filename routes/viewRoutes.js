const express = require("express");
const {filterRecords} = require("../controllers/viewController.js");
const router = express.Router();

router.route("/").get(filterRecords);

module.exports = router;