const express = require("express");
const {
  addRecord,
  updateRecord,
  deleteRecord,
  validateUser,
} = require("../controllers/recordController.js");
const router = express.Router();

router.route("/create/").post(validateUser, addRecord);
router.route("/update/:id").post(validateUser, updateRecord);
router.route("/delete/:id").post(deleteRecord);

module.exports = router;
