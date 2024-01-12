import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RncService } from './rnc.service';

@Controller('rnc')
export class RncController {
  constructor(private readonly rncService: RncService) {}

  @Get()
  async findAll() {
    return await this.rncService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const record = await this.rncService.findOne(id);
    if (record) {
      return record;
    }

    throw new HttpException(
      'Could not find RNC in our database.',
      HttpStatus.NOT_FOUND,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rncService.remove(id);
  }
}
