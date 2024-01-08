import { parse } from 'csv';
import { createReadStream } from 'fs';
import { Command, CommandRunner, Option } from 'nest-commander';
import { Rnc } from '../modules/rnc/rnc.entity';
import rncLineParser from '../utils/rnc-parser';
import { RncService } from '../modules/rnc/rnc.service';

interface ProcessRNCFileOptions {
  file?: string;
}

@Command({
  name: 'process-rnc-file',
  description: 'A command to parse the DGII RNC .txt file.',
})
export class ProcessRNCFile extends CommandRunner {
  constructor(private readonly RncService: RncService) {
    super();
  }

  async run(
    passedParam: string[],
    options?: ProcessRNCFileOptions,
  ): Promise<void> {
    try {
      const records: Rnc[] = [];
      const parser = createReadStream(options.file).pipe(
        parse({ delimiter: '|' }),
      );
      parser.on('readable', async () => {
        while (rncLineParser(parser.read()) !== null) {
          const record: Rnc = rncLineParser(parser.read());
          records.push(record);
          this.RncService.store(record);
          console.log(record);
        }
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
