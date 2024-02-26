import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RncController } from './rnc.controller';
import { Rnc } from './rnc.entity';
import { RNCQueue } from './rnc.enums';
import { RncService } from './rnc.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rnc]),
    BullModule.registerQueue({ name: RNCQueue.NAME }),
  ],
  controllers: [RncController],
  providers: [RncService],
  exports: [RncService],
})
export class RncCLIModule {}
