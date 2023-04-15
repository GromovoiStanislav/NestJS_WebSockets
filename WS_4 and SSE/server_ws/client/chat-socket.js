const socket = io("http://localhost:3000");

const message = document.getElementById("message");
const messages = document.getElementById("messages");

const handleSubmitNewMessage = () => {
  socket.emit("newMessage", { data: message.value });
};

socket.on("onMessage", ({ msg, content }) => {
  handleNewMessage(content);
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message));
  return li;
};