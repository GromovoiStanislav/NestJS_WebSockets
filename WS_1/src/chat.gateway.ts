import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "net";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: any): void {
    this.server.emit("message", message);
  }

  // @SubscribeMessage("message")
  // handleMessage(client: Socket, message: any): void {
  //   this.server.emit("message", message);
  // }

}