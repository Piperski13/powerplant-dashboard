const socket = io(); // connects to the same server

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
});
