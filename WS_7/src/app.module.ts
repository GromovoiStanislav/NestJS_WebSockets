import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: `${process.cwd()}/public` }),
    EventsModule],
})
export class AppModule {}
