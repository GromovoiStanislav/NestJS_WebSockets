import { Module } from '@nestjs/common';
import { ChatGateway } from "./chat.gateway";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  providers: [ChatGateway],
})
export class AppModule {}
