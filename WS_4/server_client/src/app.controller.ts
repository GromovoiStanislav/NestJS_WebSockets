import { Controller, Get, Param, Post } from "@nestjs/common";

import { SocketClient } from "./socket/socket-client";

@Controller()
export class AppController {
  constructor(private readonly socketClient: SocketClient) {
  }

  @Get()
  getHello(): string {
    return "Hello World!";
  }


  @Post("ws/:data")
  sendMessage(@Param("data") data: string): void {
    this.socketClient.sendMessage({ data });
  }

}
