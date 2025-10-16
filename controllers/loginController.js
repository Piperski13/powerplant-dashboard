const Login = require("../model/loginModel.js");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("dotenv").config("../.env");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("surname")
    .trim()
    .isAlpha()
    .withMessage(`Surname ${alphaErr}`)
    .isLength({ min: 2, max: 12 })
    .withMessage(`Surname ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Lastname ${alphaErr}`)
    .isLength({ min: 2, max: 12 })
    .withMessage(`Lastname ${lengthErr}`),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 2 }).withMessage("Password too short"),
];

const showSignIn = async (req, res) => {
  res.render("signIn", { error: false, user: req.user });
};

const showLogin = async (req, res) => {
  res.render("login", { error: false, user: req.user });
};

const signIn = async (req, res) => {
  const errors = validationResult(req);
  const { email, surname, lastname, password } = req.body;

  let allErrors = errors.array();

  try {
    if (await Login.emailExists(email)) {
      allErrors.push({ msg: "Email already registered" });
    }

    if (allErrors.length > 0) {
      return res.status(400).render("signIn", {
        errors: allErrors,
        user: req.user,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Login.addUser(email, hashedPassword, surname, lastname);

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("signIn", { error: "Server error", user: req.user });
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("login", { error: info.message, user: req.user });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/viewPage/welcome");
    });
  })(req, res, next);
};

const logout = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { showSignIn, showLogin, signIn, login, logout, validateUser };
