import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";
import { EventsService } from "../events/events.service";

@Injectable()
export class SocketClient implements  OnModuleInit{

  socketClient: Socket;

  constructor(
    private readonly eventsService: EventsService) {
    this.socketClient = io('http://localhost:3000');
  }

  onModuleInit() {
    this.registerConsumerEvents()
  }

  private registerConsumerEvents(){

    this.socketClient.on('connect',()=>{
      console.log('Connected to Gateway');
    })

    this.socketClient.on('onMessage',(payload:any)=>{
      console.log(payload);
      this.eventsService.emit(payload.content);
    })

  }


  sendMessage(data){
    this.socketClient.emit('newMessage', data )
  }
}