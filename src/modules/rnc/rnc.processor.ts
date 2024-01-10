import { Processor, Process, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { RNCQueue } from './rnc.enums';
import { RncService } from './rnc.service';

@Processor(RNCQueue.NAME)
export class RncProcessor {
  rncService: RncService;

  constructor(private readonly RncService: RncService) {
    this.rncService = RncService;
  }

  @Process(RNCQueue.PARSE_LINE)
  async processRncRecord(job: Job) {
    await this.RncService.add(job.data);
    Logger.log(
      `RNC record ${job.data.id} processed in the queue successfully!`,
    );
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    console.log(job);
    Logger.error(`RNC record job ${job} process failed.`);
  }
}
