import { Module } from '@nestjs/common';
import { RncService } from './rnc.service';
import { RncController } from './rnc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rnc } from './rnc.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rnc]),
    BullModule.registerQueue({ name: 'rnc' }),
  ],
  controllers: [RncController],
  providers: [RncService],
  exports: [RncService],
})
export class RncModule {}
