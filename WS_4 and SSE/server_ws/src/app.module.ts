import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    GatewayModule],
})
export class AppModule {}
