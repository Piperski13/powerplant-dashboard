const pool = require("../db/pool");

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
      const query = `
      SELECT 
        v.sifra, 
        v.naziv, 
        COUNT(e.id) AS ukupanbrojelektrana
      FROM vrstapogona v
      LEFT JOIN evidencijaelektrana e
        ON e.sifravrstepogona = v.sifra
      GROUP BY v.sifra, v.naziv
      ORDER BY v.sifra ASC;
    `;

      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error database query (getAllPlants): ", error.message);
    }
  }
}

module.exports = View;
