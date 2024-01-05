import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMConfig } from './database/config';
import { RncModule } from './modules/rnc/rnc.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeORMConfig),
    RncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
