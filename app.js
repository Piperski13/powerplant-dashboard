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
const incDecRouter = require("./routes/incDecRoutes.js");

//test
const recordController = require("./controllers/recordController.js");

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

// Serve the records view page and handle query parameters for filtering
app.get("/recordsViewPage", cookieJwtAuth, recordController.filterRecords );


app.use("/records", recordRouter);

app.use("/login", loginRouter);

app.use("/plants", incDecRouter);


module.exports = app;
