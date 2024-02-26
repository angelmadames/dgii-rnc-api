import { CommandFactory } from 'nest-commander';
import { CLIModule } from './cli.module';

const bootstrap = async () => {
  await CommandFactory.run(CLIModule, ['log', 'warn', 'error']);
};

bootstrap();
