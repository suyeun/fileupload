import 'winston-daily-rotate-file';
import winston from 'winston';
import { path } from 'app-root-path';
import { join } from 'path';

const logDir = join(path, 'logs');
const isDev = process.env['NODE_ENV'] === 'development';
const isTest = process.env['NODE_ENV'] === 'test';
const appName = process.env['APP_NAME'] ?? 'SEERSLAB';
const datePattern = 'YY-MM-DD';
const timezone = () => {
  return new Date().toLocaleString('EU', {
    timeZone: 'Asia/Seoul',
  });
};

export default winston.createLogger({
  level: isDev ? 'debug' : 'info',
  // defaultMeta: { service: appName },
  format: winston.format.combine(winston.format.simple(), winston.format.timestamp({ format: timezone })),
  silent: isTest,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple(), winston.format.timestamp()),
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        // 색상 형식을 제거
        winston.format.uncolorize(),
        winston.format.simple(),
      ),
      level: 'error',
      datePattern,
      dirname: `${logDir}/error`,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
      silent: isTest,
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        // 색상 형식을 제거
        winston.format.uncolorize(),
        winston.format.simple(),
      ),
      level: 'debug',
      datePattern,
      dirname: `${logDir}/debug`,
      filename: `%DATE%.debug.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
      silent: isTest,
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        // 색상 형식을 제거
        winston.format.uncolorize(),
        winston.format.simple(),
      ),
      level: 'info',
      datePattern,
      dirname: `${logDir}/info`,
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
      silent: isTest,
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        // 색상 형식을 제거
        winston.format.uncolorize(),
        winston.format.simple(),
      ),
      level: 'warn',
      datePattern,
      dirname: `${logDir}/warn`,
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
      silent: isTest,
    }),
  ],
});
