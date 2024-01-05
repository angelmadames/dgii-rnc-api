import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rnc } from './rnc.entity';

@Injectable()
export class RncService {
  constructor(
    @InjectRepository(Rnc)
    private rncRepository: Repository<Rnc>,
  ) {}

  findAll(): Promise<Rnc[]> {
    return this.rncRepository.find();
  }

  findOne(id: string): Promise<Rnc | null> {
    return this.rncRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.rncRepository.delete(id);
  }
}
