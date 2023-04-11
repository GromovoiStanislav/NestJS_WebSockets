import { ArgumentsHost, Catch, WsExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Catch()
export class WebsocketsExceptionFilter implements WsExceptionFilter {
  catch(_exception: WsException, host: ArgumentsHost): any {
    const socket = host.switchToWs().getClient();
    console.log('_exception',_exception);
    socket.emit('exception', {
      status: 'error',
      message: 'Message is invalid',
    });
  }
}