const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();

router.route("/generate-otp").post(generateOtp);
router.route("/verify-otp").post(verifyOtp);

module.exports = router;
