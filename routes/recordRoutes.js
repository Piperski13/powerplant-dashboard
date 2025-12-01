const express = require("express");
const {
  addRecord,
  updateRecord,
  deleteRecord,
  validateUser,
} = require("../controllers/recordController.js");
const router = express.Router();
const { upload } = require("../config/multer");

router
  .route("/create/")
  .post(upload.array("myFile", 3), validateUser, addRecord);
router
  .route("/update/:id")
  .post(upload.array("myFile", 3), validateUser, updateRecord);
router.route("/delete/:id").post(deleteRecord);

module.exports = router;
