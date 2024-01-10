import { Rnc } from 'src/modules/rnc/rnc.entity';

export const rncLineParser = (line: string): Rnc => {
  try {
    const parsedLine = line.split('|').map((field: string) => {
      return field
        .replace(/\s{2,}/g, ' ')
        .replaceAll('"', '')
        .trim();
    });

    const rncRecord: Rnc = {
      id: parsedLine[0],
      name: parsedLine[1],
      commercialName: parsedLine[2],
      description: parsedLine[3],
      address: `${parsedLine[4]} ${parsedLine[5]} ${parsedLine[6]}`,
      phone: parsedLine[7],
      creationDate: parsedLine[8],
      status: parsedLine[9],
      paymentSystem: parsedLine[10],
    };

    return rncRecord;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export default rncLineParser;
