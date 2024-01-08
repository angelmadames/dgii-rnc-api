import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BullModule } from '@nestjs/bull';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(process.env.PORT) || 3000);
};

bootstrap();
