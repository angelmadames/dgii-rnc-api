import { Logger } from '@nestjs/common';
import 'dotenv/config';
import { Command, CommandRunner, Option } from 'nest-commander';
import FileManager from '../utils/file-manager';

interface DownloadRNCFileOptions {
  url?: URL;
  path?: string;
  unzippedPath?: string;
}

@Command({
  name: 'download-rnc-file',
  description: 'A command to download the DGII RNC .txt file.',
})
export class DownloadRNCFile extends CommandRunner {
  private readonly logger = new Logger(DownloadRNCFile.name);

  async run(params: string[], options?: DownloadRNCFileOptions): Promise<void> {
    try {
      await FileManager.downloadFromURL(options.url, options.path);
      FileManager.unzipFile(options.path);

      if (FileManager.isFile(options.unzippedPath)) {
        this.logger.log(
          `File unzipped successfully at ${options.unzippedPath}`,
        );
        await FileManager.deleteFile({
          path: options.path,
          force: true,
        });
      }
    } catch (e) {
      throw new Error(`Could not unzip downloaded file.\nError: ${e}`);
    }
  }

  @Option({
    flags: '-u, --url [URL]',
    description: 'URL parser',
    defaultValue: process.env.RNC_FILE_URL,
  })
  parseURL(url: string): URL {
    return new URL(url);
  }

  @Option({
    flags: '-p, --path [path]',
    description: 'Path of downloaded files',
    defaultValue: process.env.DOWNLOADED_FILE_PATH,
  })
  parseDownloadPath(path: string): string {
    return path;
  }

  @Option({
    flags: '-z, --unzipped-path [path]',
    description: 'The unzipped path of downloaded files',
    defaultValue: process.env.UNZIPPED_FILE_PATH,
  })
  parseUnzippedPath(path: string): string {
    return path;
  }
}
