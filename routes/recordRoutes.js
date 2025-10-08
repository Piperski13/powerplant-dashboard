const express = require("express");
const recordController = require("../controllers/recordController.js");
const router = express.Router();

router.route("/create/").post(recordController.addRecord);
router.route("/update/:id").post(recordController.updateRecord);
router.route("/delete/:id").post(recordController.deleteRecord);

module.exports = router;
