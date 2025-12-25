function isAdmin(req, res, next) {
  if (!req.user || req.user.is_admin !== true) {
    return res.redirect("/");
  }

  next();
}

module.exports = isAdmin;
