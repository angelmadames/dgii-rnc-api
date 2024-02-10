import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import type { Job } from 'bull';
import { Like, Repository } from 'typeorm';
import { Rnc } from './rnc.entity';
import { RNCQueue } from './rnc.enums';

@Injectable()
export class RncService {
  constructor(
    @InjectRepository(Rnc)
    private rncRepository: Repository<Rnc>,

    @InjectQueue(RNCQueue.NAME)
    private rncQueue: Queue,
  ) {}

  add(rnc: Rnc): Promise<Rnc> {
    return this.rncRepository.save(rnc);
  }

  findAll(): Promise<Rnc[]> {
    return this.rncRepository.find();
  }

  findOne(id: string): Promise<Rnc | null> {
    return this.rncRepository.findOneBy({ id });
  }

  searchByName(name: string): Promise<Rnc[]> {
    return this.rncRepository.findBy({
      name: Like(`%${name.toUpperCase()}%`),
    });
  }

  async remove(id: string): Promise<void> {
    await this.rncRepository.delete(id);
  }

  queueStatus() {
    return this.rncQueue.client.status;
  }

  storeInQueue(rnc: Rnc): Promise<Job> {
    try {
      return this.rncQueue.add(RNCQueue.PARSE_LINE, rnc, {
        delay: 1000,
        removeOnComplete: true,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `Error adding RNC record to Queue: ${e}`,
      );
    }
  }
}
