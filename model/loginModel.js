const pool = require("../db/pool");

class Login {
  static async getUserByEmail(email) {
    try {
      const query = "SELECT * FROM korisnik WHERE email=$1";
      const value = [email];

      const { rows } = await pool.query(query, value);
      return rows[0];
    } catch (error) {
      console.error("Error database query: ", error.message);
    }
  }
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
