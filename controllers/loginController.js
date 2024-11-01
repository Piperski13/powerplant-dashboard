const pool = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

const getUser = async (username) => {
  try {
    const results = await pool.query(
      "SELECT * FROM korisnik WHERE korisnickoime=$1",
      [username]
    );
    return results.rows[0];
  } catch (error) {
    console.error(error);
  }
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

  return res.redirect("/View/recordsView.html");
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { loginAuth, logout };
