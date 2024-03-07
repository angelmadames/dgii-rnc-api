import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import { confirm } from '@inquirer/prompts';
import { Logger } from '@nestjs/common';
import axios from 'axios';

interface PathManagementOptions {
  path: string;
  force?: boolean;
  url?: URL;
}

class FileManager {
  private readonly logger = new Logger(FileManager.name);

  async downloadFromURL({ url, path }: PathManagementOptions) {
    try {
      const writer = fs.createWriteStream(path);

      this.logger.log(`Downloading file from URL: ${url}`);
      const res = await axios.get(url.toString(), { responseType: 'stream' });

      res.data.pipe(writer);
      return new Promise<void>((resolve, reject) => {
        writer.on('finish', () => {
          this.logger.log(`File downloaded to: ${path}`);
          resolve();
        });
        writer.on('error', reject);
      });
    } catch (error) {
      this.logger.error(`Failed to download file from URL: ${url}.`);
      throw new Error(error);
    }
  }

  readFile(path: string, encoding: BufferEncoding = 'utf8') {
    return fs.readFileSync(path, encoding);
  }

  deleteFile = async ({ path, force = true }: PathManagementOptions) => {
    if (this.isDirectory(path)) {
      this.logger.error(`Path: ${path} is not a valid file.`);
      return;
    }

    if (force || (await confirm({ message: `Delete file '${path}'?` }))) {
      fs.rmSync(path, { force: true });
      this.logger.log(`File: ${path} deleted.`);
    }
  };

  unzipFile(path: string, unzippedPath?: string) {
    try {
      spawnSync('unzip', ['-o', path.toString()]);
    } catch (error) {
      this.logger.error(`Could not unzip specified file: ${path}.`);
      throw new Error(error);
    }
  }

  isFile(path: string) {
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
  }

  isDirectory(path: string) {
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  }
}

export default new FileManager();
