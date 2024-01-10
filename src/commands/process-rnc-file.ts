import { parse } from 'csv';
import { createReadStream } from 'fs';
import { Command, CommandRunner, Option } from 'nest-commander';
import { Rnc } from '../modules/rnc/rnc.entity';
import rncLineParser from '../utils/rnc-parser';
import { RncService } from '../modules/rnc/rnc.service';
import * as readline from 'node:readline';

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
    try {
      return new Promise((resolve) => {
        const rl = readline.createInterface({
          input: createReadStream(options.file, { encoding: 'utf8' }),
          crlfDelay: Infinity,
        });

        rl.on('line', (line) => {
          const record: Rnc = rncLineParser(line);
          this.rncService.storeInQueue(record);
          console.log(
            `RNC record added to queue: ${record.id} / ${record.name}`,
          );
        });

        rl.on('close', () => {
          this.rncService.flushQueue();
          console.log(`RNC file processed successfully.`)
          resolve();
        });
      });
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
