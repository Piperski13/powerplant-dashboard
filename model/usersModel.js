const pool = require("../db/pool");

class Users {
  static async getById(id) {
    try {
      const query = `SELECT * FROM korisnici WHERE id=$1;`;
      const value = [id];

      const { rows } = await pool.query(query, value);
      return rows[0] || null;
    } catch (error) {
      console.error("Error database query Users (getById): ", error.message);
    }
  }
  static async getByEmail(email) {
    try {
      const query = `SELECT * FROM korisnici WHERE email=$1;`;
      const value = [email];

      const { rows } = await pool.query(query, value);
      return rows[0] || null;
    } catch (error) {
      console.error("Error database query Users (getByEmail): ", error.message);
    }
  }
  static async deleteById(id) {
    try {
      const query = "DELETE FROM korisnici WHERE id=$1 RETURNING *";
      const value = [id];

      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.error(
        "Error database query (Users: deleteById): ",
        error.message
      );
    }
  }
  static async updateById({ id, email, surname, lastname, is_admin }) {
    try {
      const query =
        "UPDATE korisnici Set email = $1, surname = $2, lastname = $3, is_admin = $4  WHERE id = $5";
      const values = [email, surname, lastname, is_admin, id];

      await pool.query(query, values);
    } catch (error) {
      console.error("Error database query Users (updateById): ", error.message);
    }
  }
  static async updatePassword(password, email) {
    try {
      const query = "UPDATE korisnici SET password=$1 WHERE email=$2";
      const values = [password, email];

      await pool.query(query, values);
    } catch (error) {
      console.error(
        "Error database query Users (updatePassword): ",
        error.message
      );
    }
  }
}

module.exports = Users;
