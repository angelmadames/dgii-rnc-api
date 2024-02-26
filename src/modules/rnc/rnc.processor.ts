import {
  OnGlobalQueueActive,
  OnQueueCleaned,
  OnQueueDrained,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { RNCQueue } from './rnc.enums';
import { RncService } from './rnc.service';
import { Rnc } from './rnc.entity';

@Processor(RNCQueue.NAME)
export class RNCProcessor {
  private readonly logger = new Logger(RNCProcessor.name);

  constructor(private readonly RncService: RncService) {
    this.logger.log('RNC Processor initialized.');
  }

  @Process(RNCQueue.PARSE_LINE)
  async processRncRecord(job: Job) {
    this.RncService.add(job.data);
    this.logger.log(`RNC record added: ${job.data.id}.`);
  }

  @Process(RNCQueue.PARSE_BULK)
  async processRncRecords(job: Job<Rnc[]>) {
    for (const record of job.data) {
      this.RncService.add(record);
      this.logger.log(`RNC record added: ${record.id}.`);
    }
    this.logger.log(`Processed ${job.data.length} RNC records.`);
  }

  @OnGlobalQueueActive()
  onActive(job: Job) {
    this.logger.log('Processing RNC record batch from queue...');
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.error(`RNC record job ${job} process failed.`);
  }

  @OnQueueDrained()
  onDrained() {
    this.logger.log('All pending RNC queue jobs were processed.');
  }
}
