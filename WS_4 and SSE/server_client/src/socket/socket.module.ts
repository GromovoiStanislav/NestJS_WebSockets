import { Module } from "@nestjs/common";
import { SocketClient } from "./socket-client";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [EventsModule],
  providers: [SocketClient],
  exports: [SocketClient]
})
export class SocketModule {
}
