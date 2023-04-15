import { Body, Controller, Post, Sse } from "@nestjs/common";

import { SocketClient } from "./socket/socket-client";

import { EventsService } from "./events/events.service";

@Controller()
export class AppController {
  constructor(
    private readonly socketClient: SocketClient,
    private readonly eventsService: EventsService) {
  }


  @Sse("sse")
  sse() {
    return this.eventsService.subscribe();
  }


  @Post("ws")
  sendMessage(@Body() data: { message: string }) {
    this.socketClient.sendMessage({ data: data.message });
  }

}
