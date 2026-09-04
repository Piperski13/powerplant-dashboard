const express = require("express");
const {
  validateWorkspaceBody,
  validateWorkspaceIdParam,
} = require("../middleware/validators/workspace/workspace.validator");
const handleWorkspaceValidation = require("../middleware/validators/workspace/handleWorkspaceValidation");

const isAuthenticated = require("../middleware/auth/isAuthenticated");

const {
  index,
  show,
  showDashboard,
  newWorkspace,
  create,
  edit,
  update,
  remove,
} = require("../controllers/workspace.controller");

const router = express.Router();

router.get("/dashboard", isAuthenticated, showDashboard);
router.get("/", index);
router.get("/new", isAuthenticated, newWorkspace);

router.post(
  "/create",
  isAuthenticated,
  validateWorkspaceBody,
  handleWorkspaceValidation,
  create,
);

router.get("/:workspaceId", validateWorkspaceIdParam, show);
router.get(
  "/:workspaceId/edit",
  isAuthenticated,
  validateWorkspaceIdParam,
  edit,
);

router.post(
  "/:workspaceId/update",
  isAuthenticated,
  validateWorkspaceIdParam,
  validateWorkspaceBody,
  handleWorkspaceValidation,
  update,
);
router.post(
  "/:workspaceId/delete",
  isAuthenticated,
  validateWorkspaceIdParam,
  remove,
);

module.exports = router;
