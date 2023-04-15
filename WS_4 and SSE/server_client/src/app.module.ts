import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketModule } from './socket/socket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { EventsModule } from './events/events.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SocketModule,
    EventsModule],
  controllers: [AppController],
})
export class AppModule {}
