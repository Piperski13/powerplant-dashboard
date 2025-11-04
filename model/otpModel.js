const pool = require("../db/pool");

class Otp {
  static async storeOtp(email, otp) {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

      const { rows } = await pool.query(
        "INSERT INTO otps (email, otp) VALUES ($1, $2)",
        [email, otp]
      );

      return rows[0] || null;
    } catch (error) {
      console.error("Error database query storeOtp: ", error.message);
    }
  }
  static async verifyOtp(email, otp) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM otps WHERE email = $1 AND otp = $2 ORDER BY created_at DESC LIMIT 1",
        [email, otp]
      );

      if (!rows.length) return { valid: false, reason: "invalid" };

      const createdAt = new Date(rows[0].created_at);
      const now = new Date();
      const diff = (now - createdAt) / 1000 / 60;

      if (diff > 5) return { valid: false, reason: "expired" };

      return { valid: true, data: rows[0] };
    } catch (error) {
      console.error("Error database query verifyOtp:", error.message);
      throw error;
    }
  }
}

module.exports = Otp;
