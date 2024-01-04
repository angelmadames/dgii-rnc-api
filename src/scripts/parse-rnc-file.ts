import type { RNC } from '../database/schema.ts';
import FileParser from '../libs/file-parser';

const UNZIPPED_FILE_PATH = './TMP/DGII_RNC.TXT';

const content = FileParser.readFile(UNZIPPED_FILE_PATH, 'latin1');
const csvContent = content.replace(/\|/g, ',').split('\n');
const nonEmptyCsvContent = csvContent
  .filter((line) => line.trim() !== '')
  .join('\n');

FileParser.readLine(
  UNZIPPED_FILE_PATH,
  'latin1',
  (line: string) => {
    const parsedLine = line
      .split('|')
      .map((field: string) => field.replace(/\s{2,}/g, ' '));
    console.log(parsedLine);
    const rncRecord: RNC = {
      id: parsedLine[0],
      name: parsedLine[1],
      commercialName: parsedLine[2],
      description: parsedLine[3],
      address: `${parsedLine[4]} ${parsedLine[5]} ${parsedLine[6]}`,
      phone: parsedLine[7],
      creationDate: parsedLine[8],
      status: parsedLine[9],
      paymentSystem: parsedLine[10]
    }
    console.log(rncRecord);
  },
  () => {
    console.log('Done reading DGII RNC file.');
  },
);
