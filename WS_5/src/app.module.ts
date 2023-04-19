import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageModule } from "./message/message.module";


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      autoLoadEntities: true,
      synchronize: true
    }),
    ServeStaticModule.forRoot({ rootPath: `${process.cwd()}/public` }),
    MessageModule
  ]

})
export class AppModule {
}
