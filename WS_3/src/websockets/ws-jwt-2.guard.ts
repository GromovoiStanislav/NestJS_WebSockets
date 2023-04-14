import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";


@Injectable()
export class WsJwt2Guard implements CanActivate {

  //constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      // const authToken = client.handshake?.query?.token;
      // const user: User = await this.authService.verifyUser(authToken);
      // client.join(`house_${user?.house?.id}`);

      const user = { id: 1, name: "Tom" };
      context.switchToHttp().getRequest().user = user;
      // or:
      // context.switchToWs().getClient().user = user;


      return Boolean(user);
    } catch (err) {
      throw new WsException(err.message);
    }

  }

}