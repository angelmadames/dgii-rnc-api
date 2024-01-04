import FileManager from '../libs/file-manager.ts';
import { RNCLineParser } from '../libs/rnc-parser.ts';

const RNCCollectionFile =
  process.env.UNZIPPED_FILE_PATH || './TMP/DGII_RNC.TXT';

FileManager.readLines(
  RNCCollectionFile,
  'latin1',
  (line: string) => {
    const rnc = RNCLineParser(line);
    console.log(rnc);
  },
  () => {
    console.log('Done reading and parsing DGII RNC file.');
  },
);
