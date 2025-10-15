const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool.js");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const result = await pool.query(
          "SELECT * FROM korisnik WHERE email = $1",
          [email]
        );
        const user = result.rows[0];
        if (!user) return done(null, false, { message: "User not found" });
        if (user.password !== password)
          return done(null, false, { message: "Incorrect password" });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM korisnik WHERE id = $1", [
      id,
    ]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});
