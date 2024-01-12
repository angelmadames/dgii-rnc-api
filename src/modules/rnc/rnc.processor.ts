import {
  OnQueueDrained,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { RNCQueue } from './rnc.enums';
import { RncService } from './rnc.service';

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

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.error(`RNC record job ${job} process failed.`);
  }

  @OnQueueDrained()
  onDrained() {
    this.logger.log('All pending RNC queue jobs were processed.');
  }
}
