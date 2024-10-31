const pool = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

const getUser = async (username) => {
  return { userId: 123, password: "ap", username };
};

const loginAuth = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (user.password !== password) {
    return res.status(403).json({
      error: "invalid login",
    });
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token);

  return res.redirect("/View/recordsView.html");
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/index.html");
};
module.exports = { loginAuth, logout };
