import { NewRNC } from '../database/schema.ts';
import FileManager from '../libs/file-manager.ts';
import { RNCLineParser } from '../libs/rnc-parser.ts';
import RNCRepository from '../repositories/rnc.ts';

const RNCCollectionFile =
  process.env.UNZIPPED_FILE_PATH || './TMP/DGII_RNC.TXT';

FileManager.readLines(
  RNCCollectionFile,
  'latin1',
  async (line: string) => {
    const rncRecord: NewRNC = RNCLineParser(line);
    console.log(rncRecord);
    await RNCRepository.add(rncRecord);
    console.log(rncRecord);
  },
  () => {
    console.log('Done reading and parsing DGII RNC file.');
  },
);
