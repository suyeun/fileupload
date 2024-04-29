import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Logger } from '@nestjs/common';

const logger = new Logger('MulterOptions');

const pathMaker = (directory: string) => {
  const uploadPath = path.join(__dirname, '../../uploads/', directory ? `${directory}/` : '');
  if (fs.existsSync(uploadPath)) return;

  fs.mkdirSync(uploadPath, { recursive: true });
  logger.warn(`path create : ${uploadPath}`);
};

const storageService = (directory?: string): multer.StorageEngine => {
  if (directory) pathMaker(directory);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return multer.diskStorage({
    destination(req, file, cb) {
      const request = req;
      const requestFile = file;
      const uploadPath = path.join(__dirname, '../../uploads/', directory ? `${directory}/` : '');
      cb(null, uploadPath);
    },
    filename(req, file: any, cb) {
      const request = req;
      const requestFile = file;
      const ext = path.extname(file.originalname);
      const targetFileName = `${path.basename(file.originalname, ext)}_${Date.now()}${ext}`;
      // logger.debug(`REQ FILE : ${targetFileName}, ${file.originalname}`);
      cb(null, targetFileName);
    },
  });
};

export const multerOptions = (directory?: string) => {
  return <MulterOptions>{
    storage: storageService(directory),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB : 전송 제한
  };
};
