const pool = require("../db/pool");

class View {
  static async filterRecords(filter, user_id) {
    try {
      const baseQuery = `SELECT * FROM evidencijaelektrana WHERE nazivelektrane ILIKE $1`;
      const values = [`${filter}%`];

      const query = user_id ? `${baseQuery} AND user_id = $2` : baseQuery;

      if (user_id) values.push(user_id);

      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error("Database error (filterData):", error.message);
      throw error;
    }
  }
  static async getAllPlants(user_id) {
    try {
      const baseQuery = `
      SELECT 
        v.sifra, 
        v.naziv, 
        COUNT(e.id) AS ukupanbrojelektrana
      FROM vrstapogona v
      LEFT JOIN evidencijaelektrana e
        ON e.sifravrstepogona = v.sifra
    `;

      const query = user_id
        ? `${baseQuery} AND e.user_id = $1 GROUP BY v.sifra, v.naziv ORDER BY v.sifra ASC`
        : `${baseQuery} GROUP BY v.sifra, v.naziv ORDER BY v.sifra ASC`;

      const values = user_id ? [user_id] : [];

      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error("Database error (getAllPlants):", error.message);
      throw error;
    }
  }
  static async getUsers() {
    try {
      const { rows } = await pool.query(`SELECT * FROM korisnici`);

      return rows;
    } catch (error) {
      console.error("Database error (getUsers):", error.message);
      throw error;
    }
  }
  static async filterUsers(filter) {
    try {
      const query = `SELECT * FROM korisnici WHERE email ILIKE $1;`;
      const value = [`${filter}%`];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (filterUsers): ", error.message);
    }
  }
}

module.exports = View;
