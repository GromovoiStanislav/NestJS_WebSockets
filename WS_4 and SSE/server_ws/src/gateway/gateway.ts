import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class MyGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;


  onModuleInit() {
    this.server.on("connect", (client) => {
      console.log("connect", client.id);
    });


  }

  @SubscribeMessage("newMessage")
  newMessage(@MessageBody() data: any) {
    console.log(data);
    this.server.emit("onMessage", {
      msg: "newMessage",
      content: data.data
    });
  }


}