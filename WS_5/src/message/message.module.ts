import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageGateway } from "./message.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, MessageGateway]
})
export class MessageModule {
}
