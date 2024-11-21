const pool = require("../config/db");

class Record {
  static async add({
    nazivelektrane,
    mesto,
    adresa,
    datumpustanjaurad,
    sifravrstepogona,
  }) {
    try {
      const query = `INSERT INTO evidencijaelektrana (nazivelektrane,mesto,adresa,datumpustanjaurad,sifravrstepogona) VALUES ($1,$2,$3,$4,$5) RETURNING *`;

      const value = [
        nazivelektrane,
        mesto,
        adresa,
        datumpustanjaurad,
        sifravrstepogona,
      ];

      const { rows } = await pool.query(query, value);

      return rows[0]; // return new record
    } catch (error) {
      console.error("Database query failed (add):", error.message);
    }
  }
  static async getAll() {
    try {
      const query = `SELECT * FROM evidencijaelektrana ORDER BY id ASC`;

      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Database query failed (getAll):", error.message);
    }
  }
  static async getById(id) {
    try {
      const query = `SELECT * FROM evidencijaelektrana WHERE id=$1;`;
      const value = [id];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (getById): ", error.message);
    }
  }
  static async deleteById(id) {
    try {
      const query = "DELETE FROM evidencijaelektrana WHERE id=$1 RETURNING *";
      const value = [id];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error("Error database query (deleteById): ", error.message);
    }
  }
  static async updateById({
    id,
    nazivelektrane,
    mesto,
    adresa,
    datumpustanjaurad,
    sifravrstepogona,
  }) {
    try {
      const query =
        "UPDATE evidencijaelektrana Set nazivelektrane = $1, mesto = $2, adresa = $3, datumpustanjaurad = $4, sifravrstepogona = $5 WHERE id = $6";
      const values = [
        nazivelektrane,
        mesto,
        adresa,
        datumpustanjaurad,
        sifravrstepogona,
        id,
      ];

      await pool.query(query, values);
    } catch (error) {
      console.error("Error database query (updateById): ", error.message);
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

module.exports = Record;
