const socket = io("http://localhost:3000/vuechat", {
  // extraHeaders: {
  //   "my-custom-header": "1234",
  //    Authorization: "Bearer accessToken"
  // },
  transportOptions: {
    polling: {
      extraHeaders: {
        "my-custom-header": "Hello world",
        Authorization: "Bearer accessToken"
      }
    }
  },




  auth: {
    token: "123"
  },
  query: {
    "my-custom-data": JSON.stringify({ a: 1, b: 2, c: 3 })
  }
});

Vue.component("chat-message", {
  props: ["message", "user"],
  template: `
  <div class="message" :class="{'owner':message.id===user.id}">
    <div class="message-content z-depth-1">
      {{message.name}}: {{message.text}}
    </div>
  </div>
`
});

new Vue({
  el: "#app",
  data: { message: "", messages: [], user: { name: "", room: "" }, users: [] },
  methods: {
    initializeConnection() {
      socket.on("users:apdate", (users) => {
        this.users = [...users];
      });
      socket.on("message:new", (message) => {
        this.messages.push(message);
        scrollToBottom(this.$refs.messages);
      });
      scrollToBottom(this.$refs.messages);
    },

    sendMessage() {
      if (this.message === "") {
        return;
      }
      const message = {
        text: this.message,
        name: this.user.name,
        id: this.user.id
      };
      socket.emit("message:create", message, () => {
        this.message = "";
      });
    }
  },
  created() {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    const room = searchParams.get("room");
    this.user = { name, room };
  },

  mounted() {
    this.initializeConnection();
    socket.emit("join", this.user, data => {
      this.user.id = data.userId;
    });
  }
});

function scrollToBottom(node) {
  setTimeout(() => (node.scrollTop = node.scrollHeight));
}
