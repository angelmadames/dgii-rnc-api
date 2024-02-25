import * as fs from 'node:fs';
import { confirm } from '@inquirer/prompts';
import axios from 'axios';
import { Logger } from '@nestjs/common';

class FileManager {
  private readonly logger = new Logger();

  isFile(path: string): boolean {
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
  }

  isDirectory(path: string): boolean {
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  }

  deleteFile = async ({
    path,
    force = false,
  }: {
    path: string;
    force?: boolean;
  }): Promise<void> => {
    if (this.isDirectory(path)) {
      this.logger.log(`Path: ${path} is not a valid file.`);
      return;
    }

    if (force || (await confirm({ message: `Delete file '${path}'?` }))) {
      fs.rmSync(path, { force: true });
      this.logger.log(`File: ${path} deleted.`);
    } else {
      this.logger.log('Skipping...');
    }
  };

  async downloadFromURL(url: URL, path: string): Promise<void> {
    try {
      this.logger.log(`Downloading file from URL: ${url}`);
      const res = await axios.get(url.toString(), { responseType: 'stream' });
      const writer = fs.createWriteStream(path);

      res.data.pipe(writer);

      return new Promise<void>((resolve, reject) => {
        writer.on('finish', () => {
          this.logger.log(`File downloaded to: ${path}`);
          resolve();
        });
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`❌ Failed to download file. \nMessage: ${error}`);
    }
  }

  readFile(path: string, encoding: BufferEncoding = 'utf8') {
    return fs.readFileSync(path, encoding);
  }
}

export default new FileManager();
