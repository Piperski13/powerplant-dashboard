const express = require("express");
const recordController = require("../controllers/recordController.js");
const cookieJwtAuth = require("../public/scripts/middleware/cookieJwtAuth.js");
const businessRuleMiddleware = require("../public/scripts/middleware/businessRule.js");
const router = express.Router();

router
  .route("/")
  .post(cookieJwtAuth, businessRuleMiddleware, recordController.addRecord);

router
  .route("/record/:id")
  .get(cookieJwtAuth, recordController.getRecord)
  .delete(cookieJwtAuth, recordController.deleteRecord)
  .put(cookieJwtAuth, recordController.updateRecord);

module.exports = router;
