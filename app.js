const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config("./.env");
const app = express();
const cookieJwtAuth = require("./public/scripts/middleware/cookieJwtAuth.js");

const recordRouter = require("./routes/recordRoutes.js");
const loginRouter = require("./routes/loginRoutes.js");
const incDecRouter = require("./routes/incDecRoutes.js");
const viewRouter = require("./routes/viewRoutes.js");

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

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", loginRouter);

app.get("/addRecordPage", cookieJwtAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "addRecord.html"));
});

// app.use("/recordsViewPage", cookieJwtAuth, viewRouter);
app.use("/viewPage", cookieJwtAuth, viewRouter);

// router.get("/welcome", cookieJwtAuth, (req, res) => {
//   res.render("welcome", { user: req.user });
// });

app.use("/records", recordRouter);

app.use("/plants", incDecRouter);

module.exports = app;
