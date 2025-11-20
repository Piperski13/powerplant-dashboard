const pool = require("../db/pool");

class ForgotPassword {
  static async addPasswordReset(email, hashedToken, expiresAt) {
    try {
      await pool.query(
        `INSERT INTO password_resets (email, token, expires_at)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET token = $2, expires_at = $3`,
        [email, hashedToken, expiresAt]
      );
    } catch (err) {
      throw err;
    }
  }
  static async validPasswordResetToken() {
    const { rows } = await pool.query(
      `SELECT * FROM password_resets WHERE expires_at > NOW()`
    );
    return rows;
  }
  static async removeToken(email) {
    const { rows } = await pool.query(
      `DELETE FROM password_resets WHERE email=$1`,
      [email]
    );
    return rows;
  }
}

module.exports = ForgotPassword;
