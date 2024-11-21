const pool = require("../config/db");

class IncDec {
  static async increment(sifra) {
    try {
      const query =
        "UPDATE vrstapogona SET ukupanbrojelektrana = ukupanbrojelektrana + 1 WHERE sifra = $1 RETURNING *";
      const value = [sifra];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (increment): ", error.message);
    }
  }
  static async decrement(sifra) {
    try {
      const query =
        "UPDATE vrstapogona SET ukupanbrojelektrana = ukupanbrojelektrana - 1 WHERE sifra = $1 RETURNING *";
      const value = [sifra];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (decrement): ", error.message);
    }
  }
}

module.exports = IncDec;
