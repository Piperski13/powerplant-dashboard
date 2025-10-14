const jwt = require("jsonwebtoken");
const Login = require("../model/loginModel.js");
require("dotenv").config("../.env");

const getUser = async (email) => {
  try {
    const result = await Login.getUserByEmail(email);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const showLogin = async (req, res) => {
  res.render("login", { error: true });
};

const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUser(email);

  if (!user) {
    return res.status(403).json({
      error: "invalid login",
    });
  } else if (user.password !== password) {
    return res.status(403).json({
      error: "invalid login",
    });
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true });

  res.redirect("/viewPage/welcome");
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { loginAuth, showLogin, logout };
