import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      //rootPath: join(__dirname, '..', 'public'),
      rootPath: join(process.cwd(), 'public'),
    }),
    WebsocketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
