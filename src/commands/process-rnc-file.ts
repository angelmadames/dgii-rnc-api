import { createReadStream } from 'node:fs';
import * as readline from 'node:readline';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import { Command, CommandRunner, Option } from 'nest-commander';
import type { Rnc } from '../modules/rnc/rnc.entity';
import type { RncService } from '../modules/rnc/rnc.service';
import rncLineParser from '../utils/rnc-parser';

interface ProcessRNCFileOptions {
  file?: string;
}

@Command({
  name: 'process-rnc-file',
  description: 'A command to parse the DGII RNC .txt file.',
})
export class ProcessRNCFile extends CommandRunner {
  rncService: RncService;
  private readonly logger = new Logger(ProcessRNCFile.name);

  constructor(private readonly service: RncService) {
    super();
    this.rncService = service;
  }

  async run(
    passedParam: string[],
    options?: ProcessRNCFileOptions,
  ): Promise<void> {
    this.logger.log('Processing RNC file...');
    this.logger.log(`RNC file path: ${options.file}`);
    try {
      const processFile = async (options) => {
        return new Promise<void>((resolve, reject) => {
          let rncCount = 0;
          let rncRecords: Rnc[] = [];
          const batchSize = Number(process.env.QUEUE_BATCH_SIZE) || 10000;

          const rl = readline.createInterface({
            input: createReadStream(options.file, { encoding: 'latin1' }),
            crlfDelay: Number.POSITIVE_INFINITY,
          });

          rl.on('line', (line) => {
            const record: Rnc = rncLineParser(line);
            rncRecords.push(record);
            rncCount++;
            if (rncCount === batchSize) {
              this.rncService.storeBulkInQueue(rncRecords);
              this.logger.log(
                `RNC record job batch of size ${batchSize} added to queue!`,
              );
              rncCount = 0;
              rncRecords = [];
            }
          });

          rl.on('error', (err) => {
            this.logger.error(`RNC file could not be read: ${err.message}`);
            reject(err);
          });

          rl.on('close', () => {
            rl.close();
            this.logger.log('RNC file processed successfully.');
            resolve();
          });
        });
      };
      await processFile(options);
    } catch (e) {
      throw new Error(`Could not process the DGII RNC file.\nError: ${e}`);
    }
  }

  @Option({
    flags: '-f --file <path>',
    defaultValue: process.env.UNZIPPED_FILE_PATH,
  })
  parseFile(path: string): string {
    return path;
  }
}
