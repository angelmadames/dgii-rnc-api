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
import { CreateRncDto } from './dto/create-rnc.dto';
import { UpdateRncDto } from './dto/update-rnc.dto';

@Controller('rnc')
export class RncController {
  constructor(private readonly rncService: RncService) {}

  @Post()
  create(@Body() createRncDto: CreateRncDto) {
    return this.rncService.create(createRncDto);
  }

  @Get()
  findAll() {
    return this.rncService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rncService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRncDto: UpdateRncDto) {
    return this.rncService.update(id, updateRncDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rncService.remove(id);
  }
}
