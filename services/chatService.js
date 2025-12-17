const pool = require("../db/pool");

async function handleNewMessage(msg, io) {
  try {
    const result = await pool.query(
      "INSERT INTO chat_messages (user_id, username, message) VALUES ($1, $2, $3) RETURNING id, username, message, created_at",
      [msg.userId, msg.user, msg.text]
    );

    const insertedMessage = result.rows[0];

    // broadcast to clients
    io.emit("recieved-message", insertedMessage);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleNewMessage };
