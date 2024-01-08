import { Rnc } from 'src/modules/rnc/rnc.entity';

export const rncLineParser = (line: string[]): Rnc => {
  const parsedLine = line.map((field: string) => field.replace(/\s{2,}/g, ' '));

  const rncRecord: Rnc = {
    id: parsedLine[0].trim(),
    name: parsedLine[1].trim(),
    commercialName: parsedLine[2].trim(),
    description: parsedLine[3].trim(),
    address: `${parsedLine[4]} ${parsedLine[5]} ${parsedLine[6]}`.trim(),
    phone: parsedLine[7].trim(),
    creationDate: parsedLine[8].trim(),
    status: parsedLine[9].trim(),
    paymentSystem: parsedLine[10].trim(),
  };

  return rncRecord;
};

export default rncLineParser;
