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
  description: 'A command to download the DGII RNC CSV file.',
})
export class DownloadRNCFile extends CommandRunner {
  private readonly logger = new Logger(DownloadRNCFile.name);
  async run(params: string[], options?: DownloadRNCFileOptions) {
    const url = options.url;
    const zipFile = options.path;
    const unzippedPath = options.unzippedPath;

    try {
      // Cleanup working directory before execution
      await FileManager.deleteFile({ path: zipFile });
      await FileManager.deleteFile({ path: unzippedPath });

      // Download and unzip DGII RNC file to specified path
      await FileManager.downloadFromURL({ url: url, path: zipFile });
      FileManager.unzipFile(zipFile, unzippedPath);

      // Confirm file was unzipped successfully
      if (FileManager.isFile(unzippedPath)) {
        this.logger.log(`File unzipped successfully at ${unzippedPath}`);
        await FileManager.deleteFile({ path: zipFile });
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
