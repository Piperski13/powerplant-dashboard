const pool = require("../db/pool");

class File {
  static async addMany(fileRows) {
    try {
      let lastInserted = null;

      for (const file of fileRows) {
        const query = `
          INSERT INTO files 
          (user_id, record_id, filename, original_name, path, mimetype, size, created_at)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
          RETURNING *;
        `;

        const values = [
          file.user_id,
          file.record_id,
          file.filename,
          file.original_name,
          file.path,
          file.mimetype,
          file.size,
          file.created_at,
        ];

        const { rows } = await pool.query(query, values);
        lastInserted = rows[0];
      }

      return lastInserted;
    } catch (error) {
      console.error("Database query failed (addMany):", error.message);
    }
  }
  static async getAll(user_id) {
    try {
      if (user_id) {
        const query = `SELECT * FROM files WHERE user_id = $1`;
        const { rows } = await pool.query(query, [user_id]);
        return rows;
      }

      const { rows } = await pool.query("SELECT * FROM files");
      return rows;
    } catch (error) {
      console.error("Database error (getAll):", error.message);
      throw error;
    }
  }
}

module.exports = File;
