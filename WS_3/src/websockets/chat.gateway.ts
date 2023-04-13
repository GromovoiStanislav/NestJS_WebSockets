import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { IsNotEmpty, IsString } from "class-validator";
import { Socket, Server } from "socket.io";
import { UsersService } from "./users.service";


class ChatMessage {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}


@WebSocketGateway({
  namespace: "vuechat",
  cors: {
    origin: "*"
  }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  constructor(private users: UsersService) {
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("join")
  handleJoin(
    @MessageBody() user,
    @ConnectedSocket() client: Socket
  ) {
    client.join(user.room);
    this.users.remove(client.id);
    this.users.add(client.id, user.name, user.room);

    this.server.to(user.room).emit("users:apdate", this.users.getByRoom(user.room));
    //client.to(user.room).emit("users:apdate", this.users.getByRoom(user.room));

    client.emit("message:new", this.message("Admin", `Welcome, ${user.name}!`));
    client.broadcast.to(user.room).emit("message:new", this.message("Admin", `${user.name} joined`));

    return { userId: client.id }
  }

  @SubscribeMessage("message:create")
  handleMessageCreate(
    @MessageBody() data,
    @ConnectedSocket() client: Socket
  ) {
    const user = this.users.get(client.id);
    if (user) {
      this.server.to(user.room).emit(
        'message:new',
        this.message(data.name, data.text, data.id)
      );
    }

    return data;
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Выполняем действия

    const user = this.users.remove(client.id);
    if (user) {
      this.server.to(user.room).emit(
        'message:new',
        this.message('Admin', `${user.name} left`)
      );
      this.server.to(user.room).emit('users:apdate', this.users.getByRoom(user.room));
    }

  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    console.log('handshake',client.handshake)
    console.log('headers',client.handshake.headers)
    console.log('Authorization',client.handshake.headers.authorization)
    console.log('query',client.handshake.query)
    // @ts-ignore
    console.log('my-custom-data',JSON.parse(client.handshake.query['my-custom-data']))
    console.log('auth',client.handshake.auth)
    console.log(`args ${args}`);
    //Выполняем действия
  }

  afterInit(server: Server) {
    //console.log(server);
    //Выполняем действия
  }


  message(name: string, text: string, id?: string) {
    return { name, text, id };
  }

}