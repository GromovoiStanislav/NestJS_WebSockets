import { Module } from "@nestjs/common";
import { SocketClient } from "./socket-client";

@Module({
  providers: [SocketClient],
  exports: [SocketClient]
})
export class SocketModule {
}
