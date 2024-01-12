import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadRNCFile } from './commands/download-rnc-file';
import { ProcessRNCFile } from './commands/process-rnc-file';
import { TypeORMConfig } from './database/config';
import { RncModule } from './modules/rnc/rnc.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeORMConfig),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    RncModule,
  ],
  controllers: [AppController],
  providers: [AppService, DownloadRNCFile, ProcessRNCFile],
})
export class AppModule {}
