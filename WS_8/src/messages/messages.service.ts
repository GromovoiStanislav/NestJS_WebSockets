import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message } from "./entities/message.entity";


@Injectable()
export class MessagesService {

  messages: Message[] = [
    { name: "Marius", text: "Hello" }
  ];
  clientToUser = {};

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: await this.getClientName(clientId),
      text: createMessageDto.text
    };
    this.messages.push(message);
    return message;
  }

  async findAll() {
    return this.messages;
  }

  async identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  async getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

}
