import { CanActivate, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class WsJwtGuard implements CanActivate {

  // constructor(private userService: UserService) {
  // }

  canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken = context.args[0].handshake.headers.authorization.split(" ")[1];
    // try {
    //   const decoded = jwt.verify(bearerToken, 'secret-key') as any;
    //   return new Promise((resolve, reject) => {
    //     return this.userService.findByUsername(decoded.username).then(user => {
    //       if (user) {
    //         resolve(user);
    //       } else {
    //         reject(false);
    //       }
    //     });
    //
    //   });
    // } catch (ex) {
    //   console.log(ex);
    //   return false;
    // }


    // example:
    return bearerToken === "accessToken";

  }
}