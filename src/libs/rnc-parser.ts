import { NewRNC } from '../database/schema';

export const RNCLineParser = (line: string): NewRNC => {
  const parsedLine = line
    .split('|')
    .map((field: string) => field.replace(/\s{2,}/g, ' '));

  const rncRecord: NewRNC = {
    id: parsedLine[0],
    name: parsedLine[1],
    commercialName: parsedLine[2],
    description: parsedLine[3],
    address: `${parsedLine[4]} ${parsedLine[5]} ${parsedLine[6]}`.trim(),
    phone: parsedLine[7].trim(),
    creationDate: parsedLine[8],
    status: parsedLine[9],
    paymentSystem: parsedLine[10],
  };

  return rncRecord;
};

export default RNCLineParser;
