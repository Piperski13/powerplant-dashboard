const pool = require("../db/pool");

class Login {
  static async addUser(email, password, surname, lastname) {
    try {
      await pool.query(
        "INSERT INTO korisnik (email, password, surname, lastname) VALUES ($1, $2, $3, $4)",
        [email, password, surname, lastname]
      );
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = Login;
