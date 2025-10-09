const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.name, error.message);
    res.clearCookie("token");
    return res.redirect("/");
  }
};

module.exports = cookieJwtAuth;
