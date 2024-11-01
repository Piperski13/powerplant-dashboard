const express = require("express");
const recordController = require("../controllers/recordController.js");
const cookieJwtAuth = require("../public/scripts/middleware/cookieJwtAuth.js");
const router = express.Router();

router
  .route("/")
  .get(recordController.getAllRecords)
  .post(cookieJwtAuth,recordController.addRecord);

router
  .route("/:id")
  .get(recordController.getRecord)
  .delete(cookieJwtAuth, recordController.deleteRecord)
  .put(recordController.updateRecord);

module.exports = router;
