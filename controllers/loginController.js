const passport = require("passport");
const bcrypt = require("bcryptjs");
const Login = require("../model/loginModel.js");
require("dotenv").config("../.env");

const showSignIn = async (req, res) => {
  res.render("signIn", { error: true });
};

const showLogin = async (req, res) => {
  res.render("login", { error: true });
};

const signIn = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { email, surname, lastname } = req.body;
    await Login.addUser(email, hashedPassword, surname, lastname);
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.redirect("/");
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

module.exports = { showSignIn, showLogin, signIn, login, logout };
