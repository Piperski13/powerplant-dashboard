const express = require("express");
const {
  validateWorkspaceIdParam,
} = require("../middleware/validators/workspace/workspace.validator");
const {
  validateCollectionBody,
  validateCollectionIdParam,
} = require("../middleware/validators/collection/collection.validator");
const handleCollectionValidation = require("../middleware/validators/collection/handleCollectionValidation");

const isAuthenticated = require("../middleware/auth/isAuthenticated");

const {
  show,
  newCollection,
  create,
  edit,
  update,
  remove,
} = require("../controllers/collection.controller");

const router = express.Router({
  mergeParams: true,
});

router.get("/collections/new", isAuthenticated, newCollection);

router.post(
  "/collections/create",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionBody,
  handleCollectionValidation,
  create,
);

router.get(
  "/collections/:collectionId",
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  show,
);

router.get(
  "/collections/:collectionId/edit",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  edit,
);

router.post(
  "/collections/:collectionId/update",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  validateCollectionBody,
  handleCollectionValidation,
  update,
);
router.post(
  "/collections/:collectionId/delete",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateCollectionIdParam,
  remove,
);

module.exports = router;
