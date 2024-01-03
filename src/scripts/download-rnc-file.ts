#!/usr/bin/env bun
import FileManager from '../libs/file-manager';

const DOWNLOADED_FILE_PATH = './dgii_rncs.zip';
const UNZIPPED_FILE_PATH = './TMP/DGII_RNC.TXT';

await FileManager.downloadFromURL(
  new URL(String(process.env.RNC_FILE_URL)),
  DOWNLOADED_FILE_PATH,
);

try {
  Bun.spawnSync(['unzip', DOWNLOADED_FILE_PATH]);
  if (FileManager.isFile(UNZIPPED_FILE_PATH)) {
    console.log(`File unzipped successfully at ${UNZIPPED_FILE_PATH}`);
    FileManager.deleteFile({
      path: DOWNLOADED_FILE_PATH,
      force: true,
    });
    console.log(`Deleted file: ${DOWNLOADED_FILE_PATH}.`);
  }
} catch (e) {
  throw new Error(`Could not unzip downlaoded file.\nError: ${e}`);
}
