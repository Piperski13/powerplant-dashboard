const Otp = require("../model/otpModel");
require("dotenv").config("../.env");
const otpGenerator = require("otp-generator");
const sendOTPEmail = require("../utils/sendEmail");
const { registerPendingUser } = require("../services/userService");

const generateOtp = async (req, res) => {
  const { email, surname, lastname, password } = req.body;

  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  try {
    await Otp.storeOtp(email, otp);
    await sendOTPEmail(email, otp);

    req.session.pendingUser = { email, surname, lastname, password };

    res.render("otp", {
      user: req.user || "",
      message: "OTP sent to your email!",
      errorMessage: "",
    });
  } catch (err) {
    console.error(err);
    res.render("otp", { errorMessage: err });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const pendingUser = req.session.pendingUser;

  try {
    const { email } = pendingUser;
    const result = await Otp.verifyOtp(email, otp);

    if (!result.valid) {
      const message =
        result.reason === "expired" ? "OTP expired" : "Invalid OTP";
      return res.render("otp", {
        user: req.user,
        errorMessage: message,
        message: "",
      });
    }

    await registerPendingUser(pendingUser);
    delete req.session.pendingUser;

    res.redirect("/");
  } catch (err) {
    console.error(err);

    res.render("otp", {
      user: req.user,
      errorMessage: "Error verifying OTP",
      message: "",
    });
  }
};

module.exports = { generateOtp, verifyOtp };
