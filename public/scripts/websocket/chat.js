import { formatSimpleMessengerTime } from "./clientUtils.js";

const socket = io(); // connects to the same server

const chatBox = document.getElementById("chat-box");
const message = document.getElementById("msgInput");
const button = document.getElementById("btnSend");

button.addEventListener("click", function () {
  const surname = this.dataset.surname;
  const userId = this.dataset.id;

  socket.emit("newMessage", {
    userId: userId,
    user: surname,
    text: message.value,
  });
  message.value = "";
});

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
});

socket.on("recieved-message", (data) => {
  const formattedTime = formatSimpleMessengerTime(data.created_at);

  const div = document.createElement("div");
  div.textContent = `${data.username}: ${data.message} (${formattedTime})`;
  chatBox.appendChild(div);
});
