import log from './log';
import fs from 'fs';
import axios from 'axios';
import { confirm } from '@inquirer/prompts';

export const isFile = (path: string): boolean => {
  return fs.existsSync(path) && fs.lstatSync(path).isFile();
};

export const isDirectory = (path: string): boolean => {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
};

export const deleteFile = async ({
  path,
  force = false,
}: {
  path: string;
  force?: boolean;
}): Promise<void> => {
  log.info(`ℹ️ Removing file: ${path}`);
  if (isDirectory(path)) {
    log.warning(`⏩ Path: ${path} is not a valid file. Not removing.`);
    return;
  }

  if (
    force ||
    (await confirm({ message: `Delete file '${path}' recursively?` }))
  ) {
    fs.rmSync(path, { force: true });
    log.success(`🗑️ File: ${path} recursively deleted.`);
  } else {
    log.info('⏩ Skipping...');
  }
};

export const FileManager = {
  downloadFromUrl: async (url: string, path: string): Promise<void> => {
    try {
      log.info(`Downloading file from URL: ${url}`);
      const res = await axios.get(url, { responseType: 'stream' });
      const writer = fs.createWriteStream(path);

      res.data.pipe(writer);

      return new Promise<void>((resolve, reject) => {
        writer.on('finish', () => {
          log.success(`File downloaded to: ${path}`);
          resolve();
        });
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`❌ Failed to download file. \nMessage: ${error}`);
    }
  },
};

export default FileManager;
