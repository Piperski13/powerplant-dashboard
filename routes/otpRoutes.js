const express = require("express");
const {
  generateOtp,
  verifyOtp,
  showSignIn,
  validateUser,
} = require("../controllers/otpController");

const router = express.Router();

router.route("/generate-otp").post(validateUser, generateOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/sign-in").get(showSignIn);

module.exports = router;
