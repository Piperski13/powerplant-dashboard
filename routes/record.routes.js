const express = require("express");

const {
  validateWorkspaceIdParam,
} = require("../middleware/validators/workspace/workspace.validator");

const {
  validateCollectionIdParam,
} = require("../middleware/validators/collection/collection.validator");

const {
  validateRecordBody,
  validateRecordIdParam,
  validateDeletedFiles,
} = require("../middleware/validators/record/record.validator");

const { upload } = require("../config/multer");

const handleRecordValidation = require("../middleware/validators/record/handleRecordValidation");

const isAuthenticated = require("../middleware/auth/isAuthenticated");

const {
  show,
  newRecord,
  create,
  edit,
  update,
  remove,
} = require("../controllers/record.controller");

const router = express.Router({
  mergeParams: true,
});

router.get("/records/new", isAuthenticated, newRecord);

router.post(
  "/records/create",
  isAuthenticated,
  upload.array("files", 3),
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  validateRecordBody,
  handleRecordValidation,
  create,
);

router.get(
  "/records/:recordId",
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  validateRecordIdParam,
  show,
);

router.get(
  "/records/:recordId/edit",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  validateRecordIdParam,
  edit,
);

router.post(
  "/records/:recordId/update",
  upload.array("files", 3),
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  validateRecordIdParam,
  validateRecordBody,
  validateDeletedFiles,
  handleRecordValidation,
  update,
);
router.post(
  "/records/:recordId/delete",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  validateRecordIdParam,
  remove,
);

module.exports = router;
