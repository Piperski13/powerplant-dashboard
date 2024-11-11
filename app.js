const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require('dotenv').config('./.env');
const app = express();
const cookieJwtAuth = require("./public/scripts/middleware/cookieJwtAuth.js");
const recordRouter = require("./routes/recordRoutes.js");
const loginRouter = require("./routes/loginRoutes.js");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "login.html"));
});

app.get("/addRecordPage", cookieJwtAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "addRecord.html"));
});

app.get("/recordsViewPage", cookieJwtAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "View/recordsView.html"));
});

app.use("/records", recordRouter);

app.use("/login", loginRouter);

app.get('/user-data', (req,res)=>{

  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      username: decoded.ime,
      lastname: decoded.prezime
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
  
});

module.exports = app;
