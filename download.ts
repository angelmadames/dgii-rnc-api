import FileManager from "src/utils/file-manager";
import dotenv from 'dotenv';

dotenv.config();

FileManager.downloadFromUrl(process.env.RNC_FILE_URL, './file.zip');
