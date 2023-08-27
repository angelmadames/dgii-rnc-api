import { Module } from '@nestjs/common';
import { RncService } from './rnc.service';
import { RncController } from './rnc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rnc } from './rnc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rnc])],
  controllers: [RncController],
  providers: [RncService],
})
export class RncModule {}
