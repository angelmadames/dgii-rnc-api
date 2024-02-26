import { InjectQueue } from '@nestjs/bull';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import type { Job } from 'bull';
import { Like, Repository } from 'typeorm';
import { Rnc } from './rnc.entity';
import { RNCQueue } from './rnc.enums';

@Injectable()
export class RncService {
  private readonly logger = new Logger(RncService.name);

  constructor(
    @InjectRepository(Rnc)
    private rncRepository: Repository<Rnc>,

    @InjectQueue(RNCQueue.NAME)
    private rncQueue: Queue,
  ) {}

  async add(rnc: Rnc): Promise<Rnc> {
    return await this.rncRepository.save(rnc);
  }

  addBulk(rncRecords: Rnc[]): Promise<Rnc[]> {
    return this.rncRepository.save(rncRecords);
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

  storeBulkInQueue(records: Rnc[]): Promise<Job> {
    try {
      return this.rncQueue.add(RNCQueue.PARSE_BULK, records, {
        delay: 1000,
        removeOnComplete: true,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `Error adding RNC record bulk to Queue: ${e}`,
      );
    }
  }
}
