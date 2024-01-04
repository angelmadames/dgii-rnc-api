import * as fs from 'node:fs';
import * as readline from 'node:readline';

class FileParser {
  readFile(path: string, encoding: BufferEncoding = 'utf8') {
    return fs.readFileSync(path, encoding);
  }

  readLine(
    path: string,
    enconding: BufferEncoding = 'utf8',
    forEachLine: any,
    onClose: any,
  ) {
    const rl = readline.createInterface({
      input: fs.createReadStream(path, { encoding: enconding }),
      crlfDelay: Infinity,
    });

    rl.on('line', forEachLine);
    rl.on('close', onClose);
  }
}

export default new FileParser();
