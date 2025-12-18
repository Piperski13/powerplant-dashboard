const pool = require("../db/pool");
const Chat = require("../model/chatModel");

const socketMessageMap = new Map();

async function handleNewMessage(socket, msg, io) {
  try {
    const now = Date.now();

    if (!socketMessageMap.has(socket.id)) {
      socketMessageMap.set(socket.id, []);
    }

    const timestamps = socketMessageMap.get(socket.id);

    // Remove old timestamps
    const recentTimestamps = timestamps.filter(
      (time) => now - time < Number(process.env.TIME_WINDOW)
    );

    if (recentTimestamps.length >= Number(process.env.MESSAGE_LIMIT)) {
      socket.emit("rate-limit", {
        message: "Too many messages. Slow down.",
      });
      return;
    }

    // Record this message
    recentTimestamps.push(now);
    socketMessageMap.set(socket.id, recentTimestamps);

    const insertedMessage = await Chat.createMessage(
      msg.userId,
      msg.user,
      msg.text
    );

    // broadcast to clients
    io.emit("recieved-message", insertedMessage);
  } catch (error) {
    console.error(error);
  }
}

function clearSocket(socketId) {
  socketMessageMap.delete(socketId);
}

module.exports = { handleNewMessage, clearSocket };
