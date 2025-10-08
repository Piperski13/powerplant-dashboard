const pool = require("../config/db");

class Login {
  static async getUserByUsername(username) {
    try {
      const query = "SELECT * FROM korisnik WHERE korisnickoime=$1";
      const value = [username];

      const { rows } = await pool.query(query, value);
      return rows[0];
    } catch (error) {
      console.error("Error database query (getUsername): ", error.message);
    }
  }
}

module.exports = Login;
