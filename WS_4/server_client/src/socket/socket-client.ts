import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";

@Injectable()
export class SocketClient implements  OnModuleInit{

  socketClient: Socket;

  constructor() {
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
    })

  }


  sendMessage(data){
    this.socketClient.emit('newMessage',{ data })
  }
}