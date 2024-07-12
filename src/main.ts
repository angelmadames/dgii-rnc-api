import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(Number.parseInt(process.env.PORT) || 3000);
};

bootstrap();
