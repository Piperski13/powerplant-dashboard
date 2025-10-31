const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const isAuthenticated = require("./middleware/isAuthenticated.js");
const recordRouter = require("./routes/recordRoutes.js");
const usersRouter = require("./routes/usersRoutes.js");
const loginRouter = require("./routes/loginRoutes.js");
const viewRouter = require("./routes/viewRoutes.js");

require("./config/passportConfig");
require("dotenv").config("./.env");

const app = express();

// Built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// Routes
app.use("/", loginRouter);
app.use("/viewPage", isAuthenticated, viewRouter);
app.use("/records", isAuthenticated, recordRouter);
app.use("/users", isAuthenticated, usersRouter);
app.use((req, res) => {
  res.status(404).render("404");
});

module.exports = app;
