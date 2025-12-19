const pool = require("../db/pool");

class Chat {
  static async createMessage(userId, username, text) {
    const result = await pool.query(
      `INSERT INTO chat_messages (user_id, username, message)
     VALUES ($1, $2, $3)
     RETURNING id, username, message, created_at`,
      [userId, username, text]
    );

    return result.rows[0];
  }
}

module.exports = Chat;
