import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: `${process.cwd()}/public` }),
    IdeaModule,
  ],
})
export class AppModule {}
