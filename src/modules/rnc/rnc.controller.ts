import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RncService } from './rnc.service';

@Controller('rnc')
export class RncController {
  constructor(private readonly rncService: RncService) {}

  @Get()
  findAll() {
    return this.rncService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rncService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rncService.remove(id);
  }
}
