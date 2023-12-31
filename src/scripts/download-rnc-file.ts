#!/usr/bin/env bun

import FileManager from "../libs/file-manager";

await FileManager.downloadFromURL(new URL(String(process.env.RNC_FILE_URL)), './file.zip');
Bun.spawnSync(["unzip", "./file.zip"]);

FileManager.isDirectory('./TMP')
  ? console.log('File unzipped successfully.')
  : console.log('File not unzipped. ');
