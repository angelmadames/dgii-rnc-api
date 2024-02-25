import { createReadStream } from 'fs';
import * as readline from 'node:readline';
import { Job, JobOptions } from 'bull';
import 'dotenv/config';
import { Command, CommandRunner, Option } from 'nest-commander';
import { Rnc } from '../modules/rnc/rnc.entity';
import { RNCQueue } from '../modules/rnc/rnc.enums';
import { RncService } from '../modules/rnc/rnc.service';
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

  constructor(private readonly service: RncService) {
    super();
    this.rncService = service;
  }

  async run(
    passedParam: string[],
    options?: ProcessRNCFileOptions,
  ): Promise<void> {
    console.log('Processing RNC file...');
    console.log(`RNC file path: ${options.file}`);
    try {
      const processFile = async (options) => {
        return new Promise<void>((resolve, reject) => {
          let rncCount = 0;
          const rncRecordBatchSize =
            Number(process.env.QUEUE_BATCH_SIZE) || 10000;
          let rncRecords: Rnc[] = [];

          const rl = readline.createInterface({
            input: createReadStream(options.file, { encoding: 'utf8' }),
            crlfDelay: Infinity,
          });

          rl.on('line', (line) => {
            const record: Rnc = rncLineParser(line);
            rncRecords.push(record);
            rncCount++;
            if (rncCount === rncRecordBatchSize) {
              this.rncService.storeBulkInQueue(rncRecords);
              console.log(
                `RNC record job batch of size ${rncRecordBatchSize} added to queue!`,
              );
              rncCount = 0;
              rncRecords = [];
            }
          });

          rl.on('error', (err) => {
            console.error(`RNC file could not be read: ${err.message}`);
            reject(err);
          });

          rl.on('close', () => {
            rl.close();
            console.log('RNC file processed successfully.');
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
