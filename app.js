const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
require("dotenv").config("./.env");

const app = express();
const cookieJwtAuth = require("./middleware/cookieJwtAuth.js");

const recordRouter = require("./routes/recordRoutes.js");
const loginRouter = require("./routes/loginRoutes.js");
const viewRouter = require("./routes/viewRoutes.js");

// Built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// Routes
app.use("/", loginRouter);
app.use("/viewPage", cookieJwtAuth, viewRouter);
app.use("/records", cookieJwtAuth, recordRouter);

module.exports = app;
