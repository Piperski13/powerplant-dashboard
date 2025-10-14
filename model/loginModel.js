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
}

module.exports = Login;
