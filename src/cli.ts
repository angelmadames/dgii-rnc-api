import { CommandFactory } from 'nest-commander';
import { CLIModule } from './cli.module';
import { NestFactory } from '@nestjs/core';

const bootstrap = async () => {
  const cli = await NestFactory.createApplicationContext(CLIModule);
  await CommandFactory.run(CLIModule, ['log', 'warn', 'error']);
  await cli.close();
};

bootstrap();
