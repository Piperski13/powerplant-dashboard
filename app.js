const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { RedisStore } = require("connect-redis");
const { redisClient } = require("./config/redisClient");

const usersRouter = require("./routes/user.routes.js");
const authRouter = require("./routes/auth.routes.js");
const chatRouter = require("./routes/chat.routes.js");

const workspaceRouter = require("./routes/workspace.routes.js");
const collectionRouter = require("./routes/collection.routes.js");
const recordRouter = require("./routes/record.routes.js");

const isAuthenticated = require("./middleware/auth/isAuthenticated.js");
const errorHandler = require("./middleware/errors/errorHandler.js");

require("./config/passportConfig");

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "dataspace:",
});

const app = express();

app.set("trust proxy", 1);

// Built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    store: redisStore,
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.use("/auth", authRouter);

app.use("/workspaces", workspaceRouter);

app.use("/workspaces/:workspaceId", collectionRouter);

app.use("/workspaces/:workspaceId/collections/:collectionId", recordRouter);

app.use("/users", isAuthenticated, usersRouter);

app.use("/chat", isAuthenticated, chatRouter);

app.use(errorHandler);

module.exports = app;
