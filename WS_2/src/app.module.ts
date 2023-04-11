import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      //rootPath: join(__dirname, '..', 'static'),
      rootPath: join(process.cwd(), 'static'),
    }),
    WebsocketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
