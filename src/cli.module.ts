import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadRNCFile } from './commands/download-rnc-file';
import { ProcessRNCFile } from './commands/process-rnc-file';
import { TypeORMConfig } from './database/config';
import { RncCLIModule } from './modules/rnc/cli.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeORMConfig),
    BullModule.forRoot({
      redis: {
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST || 'localhost',
        port: Number.parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    RncCLIModule,
  ],
  providers: [DownloadRNCFile, ProcessRNCFile],
})
export class CLIModule {}
