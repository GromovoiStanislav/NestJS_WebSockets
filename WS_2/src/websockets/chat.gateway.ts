import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IsNotEmpty, IsString } from "class-validator";
import { UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebsocketsExceptionFilter } from "./ws-exception.filter";
import { Socket, Server } from 'socket.io';


class ChatMessage {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('text-chat')
  @UsePipes(ValidationPipe)
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() client: Socket,
  ) {

    // client.emit()
    // client.broadcast()

    this.server.emit('text-chat', {
      ...message,
      time: new Date().toDateString(),
    });

  }

}