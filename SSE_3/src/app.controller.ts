import {Controller, Post, Request, Sse} from '@nestjs/common';
import { EventsService } from "./events/events.service";
import { randomUUID } from "node:crypto";

@Controller()
export class AppController {
  constructor(private readonly eventsService: EventsService) {
  }

  @Sse('events')
  events(@Request() req,) {
    const id = randomUUID()
    return this.eventsService.sendEvents(id);
  }

  @Post('emit')
  async emit() {
    this.eventsService.addEvent({emitting: new Date().toISOString()});
    return {ok: true};
  }


}
