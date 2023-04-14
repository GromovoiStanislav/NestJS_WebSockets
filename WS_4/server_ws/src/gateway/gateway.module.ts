import { Module } from "@nestjs/common";
import { MyGateway } from "./gateway";

@Module({
  providers: [MyGateway],
  exports: [MyGateway]
})
export class GatewayModule {
}
