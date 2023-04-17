import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();
  const listener = await app.listen(3000);
  console.log(`Running`, 3000, listener.address());

}
bootstrap();
