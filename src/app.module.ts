import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RncModule } from './modules/rnc/rnc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeORMConfig } from './database/config';

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
