import { formatSimpleMessengerTime } from "./clientUtils.js";

const socket = io(); // connects to the same server

const chatBox = document.getElementById("chat-box");
const message = document.getElementById("msgInput");
const button = document.getElementById("btnSend");
const rateLimit = document.getElementById("rate-limit");
const noMessage = document.getElementById("noMsg");

function isUserNearBottom(threshold = 50) {
  return (
    chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - threshold
  );
}

function sendingMessage(buttonElement) {
  if (!message.value.trim()) return;

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

function toggleSendButton() {
  if (message.value.trim().length > 0) {
    button.classList.add("enabled");
  } else {
    button.classList.remove("enabled");
  }
}

function removeLimiter() {
  message.classList.remove("input-rate-limit");
  rateLimit.classList.add("hidden");
}

function noChatMessage() {
  const messageCount = chatBox.childElementCount;
  if (messageCount > 2) {
    noMessage.classList.add("hidden");
  } else {
    noMessage.classList.remove("hidden");
  }
}

window.addEventListener("load", () => {
  chatBox.scrollTop = chatBox.scrollHeight;
  noChatMessage();
});

message.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendingMessage(this);
  }
});

button.addEventListener("click", function () {
  sendingMessage(this);
});

message.addEventListener("input", toggleSendButton);

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
});

socket.on("recieved-message", (data) => {
  removeLimiter();
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
  noChatMessage();
});

socket.on("rate-limit", (data) => {
  rateLimit.classList.remove("hidden");
  rateLimit.textContent = `${data.message}`;
  message.classList.add("input-rate-limit");
});
