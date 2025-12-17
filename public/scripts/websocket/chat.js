import { formatSimpleMessengerTime } from "./clientUtils.js";

const socket = io(); // connects to the same server

const chatBox = document.getElementById("chat-box");
const message = document.getElementById("msgInput");
const button = document.getElementById("btnSend");

function isUserNearBottom(threshold = 50) {
  return (
    chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - threshold
  );
}

function sendingMessage(buttonElement) {
  const surname = buttonElement.dataset.surname;
  const userId = buttonElement.dataset.id;

  socket.emit("newMessage", {
    userId: userId,
    user: surname,
    text: message.value,
  });
  message.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

window.addEventListener("load", () => {
  chatBox.scrollTop = chatBox.scrollHeight;
});

message.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendingMessage(this);
  }
});

button.addEventListener("click", function () {
  sendingMessage(this);
});

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
});

socket.on("recieved-message", (data) => {
  const shouldAutoScroll = isUserNearBottom();

  const formattedTime = formatSimpleMessengerTime(data.created_at);

  const div = document.createElement("div");
  div.classList.add("single-message");

  const usernameSpan = document.createElement("span");
  usernameSpan.classList.add("username");
  usernameSpan.textContent = `${data.username}: `;

  div.appendChild(usernameSpan);
  div.append(`${data.message} (${formattedTime})`);

  chatBox.appendChild(div);

  if (shouldAutoScroll) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
