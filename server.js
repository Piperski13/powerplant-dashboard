const { createServer } = require("http");
const { Server } = require("socket.io");
const { handleNewMessage } = require("./services/chatService.js");
const app = require("./app.js");

require("dotenv").config("./env");

const httpServer = createServer(app);
const port = process.env.PORT || 3000;

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  socket.on("newMessage", async (message) => {
    console.log("message: ", message);
    await handleNewMessage(message, io);
  });
});

httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
