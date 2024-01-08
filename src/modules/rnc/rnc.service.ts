import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rnc } from './rnc.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class RncService {
  constructor(
    @InjectRepository(Rnc)
    private rncRepository: Repository<Rnc>,

    @InjectQueue('rnc')
    private rncQueue: Queue,
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

  async store(rnc: Rnc): Promise<void> {
    await this.rncQueue.add(rnc);
  }
}
