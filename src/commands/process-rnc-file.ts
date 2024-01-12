import { createReadStream } from 'fs';
import * as readline from 'node:readline';
import { Command, CommandRunner, Option } from 'nest-commander';
import { Rnc } from '../modules/rnc/rnc.entity';
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
