const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const Login = require("../model/loginModel.js");
require("dotenv").config("../.env");

const getUser = async (username) => {
  try {
    const result = await Login.getUsername(username);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const showLogin = async (req, res) => {
  res.render("login", { error: true });
};

const loginAuth = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (!user) {
    return res.status(403).json({
      error: "invalid login",
    });
  } else if (user.sifra !== password) {
    return res.status(403).json({
      error: "invalid login",
    });
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token);

  res.render("welcome", { user: user });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

const dynamicalHTML = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      username: decoded.ime,
      lastname: decoded.prezime,
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { loginAuth, showLogin, logout, dynamicalHTML };
