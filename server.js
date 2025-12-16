const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app.js");

require("dotenv").config("./env");

const httpServer = createServer(app);
const port = process.env.PORT || 3000;

const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
