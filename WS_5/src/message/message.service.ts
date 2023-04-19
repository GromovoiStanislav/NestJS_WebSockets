import { Injectable } from "@nestjs/common";
import { Message } from "./message.entity";

@Injectable()
export class MessageService {

  async getAll(): Promise<Message[]> {
    // @ts-ignore
    return Message.find();
  };

  async createMessage(
    sender: string,
    message: string
  ): Promise<Message> {
    const newMessage: Message = new Message(sender, message);
    return await newMessage.save();
  };

}
