const pool = require("../db/pool");

class View {
  static async filterData(filter, user_id) {
    try {
      const query = `SELECT * FROM evidencijaelektrana WHERE nazivelektrane ILIKE $1 AND user_id = $2;`;
      const value = [`${filter}%`, user_id];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (filterData): ", error.message);
    }
  }
  static async getAllPlants(user_id) {
    try {
      const query = `
      SELECT 
        v.sifra, 
        v.naziv, 
        COUNT(e.id) AS ukupanbrojelektrana
      FROM vrstapogona v
      LEFT JOIN evidencijaelektrana e
        ON e.sifravrstepogona = v.sifra
        AND e.user_id = $1
      GROUP BY v.sifra, v.naziv
      ORDER BY v.sifra ASC;
    `;

      const { rows } = await pool.query(query, [user_id]);
      return rows;
    } catch (error) {
      console.error("Error database query (getAllPlants): ", error.message);
    }
  }
}

module.exports = View;
