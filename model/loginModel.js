const pool = require("../db/pool");

class Login {
  static async addUser(email, password, surname, lastname) {
    try {
      await pool.query(
        "INSERT INTO korisnici (email, password, surname, lastname) VALUES ($1, $2, $3, $4)",
        [email, password, surname, lastname]
      );
    } catch (err) {
      throw err;
    }
  }
  static async emailExists(email) {
    try {
      const { rows } = await pool.query(
        `SELECT 1 FROM korisnici WHERE email = $1`,
        [email]
      );
      return rows.length > 0;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Login;
