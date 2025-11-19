const express = require("express");
const {
  handleForgotPassword,
  showResetForm,
  showForgotPage,
  handleResetPassword,
} = require("../controllers/forgotPasswordController");

const router = express.Router();

router.get("/password", showForgotPage);
router.post("/password", handleForgotPassword);

router.get("/reset-password/:token", showResetForm);
router.post("/reset-password/:token", handleResetPassword);

module.exports = router;
