import { Module } from '@nestjs/common';
import { ChatGateway } from "./chat.gateway";
import { UsersService } from "./users.service";

@Module({
  providers: [ChatGateway,UsersService],
})
export class WebsocketsModule {}
