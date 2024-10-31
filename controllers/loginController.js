const pool = require('../config/db');
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

const getUser = async (username) => {  //kontroler za fetchovanje usera iz DB
  return { userId: 123, password: "ap", username };
};

const loginAuth = async (req, res) => {//kontroler koji kada se ruta login pogodi poziva getUser
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
  module.exports = loginAuth;
  
  // module.exports = (app) =>
  //   app.post("/login", async (req, res) => {//kontroler koji kada se ruta login pogodi poziva getUser
  //     const { username, password } = req.body;
  
  //     const user = await getUser(username);
  
  //     if (user.password !== password) {
  //       return res.status(403).json({
  //         error: "invalid login",
  //       });
  //     }
  
  //     delete user.password;
  
  //     const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  
  //     res.cookie("token", token);
  
  //     return res.redirect("/View/recordsView.html");
  //   });