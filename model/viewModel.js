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
  static async getAllPlants() {
    try {
      const query = "SELECT * FROM vrstapogona ORDER BY sifra ASC;";

      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error database query (getAllPlants): ", error.message);
    }
  }
}

module.exports = View;
