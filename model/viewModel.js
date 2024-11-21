const pool = require("../config/db");

class View {
  static async filterData(filter) {
    try {
      const query = `SELECT * FROM evidencijaelektrana WHERE nazivelektrane ILIKE $1;`;
      const value = [`${filter}%`];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (filterData): ", error.message);
    }
  }
}

module.exports = View;
