import { Module } from '@nestjs/common';
import { RncService } from './rnc.service';
import { RncController } from './rnc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rnc } from './rnc.entity';
import { BullModule } from '@nestjs/bull';
import { RncProcessor } from './rnc.processor';
import { RNCQueue } from './rnc.enums';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rnc]),
    BullModule.registerQueue({ name: RNCQueue.NAME }),
  ],
  controllers: [RncController],
  providers: [RncService, RncProcessor],
  exports: [RncService],
})
export class RncModule {}
