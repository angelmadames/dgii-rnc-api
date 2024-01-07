import dbClient from '../database/connection.ts';
import { NewRNC, RNC, rnc } from '../database/schema.ts';
import rncLineParser from '../libs/rnc-parser.ts';
import { parse } from 'csv';
import fs from 'fs';
import { finished } from 'stream/promises';

const RNCCollectionFile =
  process.env.UNZIPPED_FILE_PATH || './TMP/DGII_RNC.TXT';

const processRncFile = async () => {
  const records: NewRNC[] = [];
  const parser = fs
    .createReadStream(RNCCollectionFile)
    .pipe(parse({ delimiter: '|' }));

  parser.on('readable', async () => {
    while (rncLineParser(parser.read()) !== null) {
      const record: NewRNC = rncLineParser(parser.read());
      console.log(record);
      records.push(record);
      await dbClient.insert(rnc).values(record).onConflictDoNothing();
    }
  });

  await finished(parser);
  return records;
}

const records = await processRncFile();
