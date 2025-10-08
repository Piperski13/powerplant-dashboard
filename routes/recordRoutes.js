const express = require("express");
const recordController = require("../controllers/recordController.js");
const businessRuleMiddleware = require("../public/scripts/middleware/businessRule.js");
const router = express.Router();

// action="/records/delete/<%= record.id %>"
// method="POST"
router.route("/").post(businessRuleMiddleware, recordController.addRecord);

router
  .route("/record/:id")
  .get(recordController.getRecord)
  .put(recordController.updateRecord);

router.route("/update/:id").put(recordController.updateRecord);
router.route("/delete/:id").post(recordController.deleteRecord);

module.exports = router;
