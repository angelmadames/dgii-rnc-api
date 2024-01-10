import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { Rnc } from './rnc.entity';
import type { Job } from 'bull';
import { RNCQueue } from './rnc.enums';

@Injectable()
export class RncService {
  constructor(
    @InjectRepository(Rnc)
    private rncRepository: Repository<Rnc>,

    @InjectQueue(RNCQueue.NAME)
    private rncQueue: Queue,
  ) {}

  async add(rnc: Rnc): Promise<Rnc> {
    return this.rncRepository.save(rnc);
  }

  findAll(): Promise<Rnc[]> {
    return this.rncRepository.find();
  }

  findOne(id: string): Promise<Rnc | null> {
    return this.rncRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.rncRepository.delete(id);
  }

  queueStatus() {
    return this.rncQueue.client.status;
  }

  async storeInQueue(rnc: Rnc): Promise<Job> {
    try {
      return this.rncQueue.add(RNCQueue.PARSE_LINE, rnc);
    } catch (e) {
      throw new InternalServerErrorException(
        `Error adding RNC record to Queue: ${e}`,
      );
    }
  }

  flushQueue() {
    return this.rncQueue.empty();
  }
}
