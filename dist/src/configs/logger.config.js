"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("winston-daily-rotate-file");
const winston_1 = __importDefault(require("winston"));
const app_root_path_1 = require("app-root-path");
const path_1 = require("path");
const logDir = (0, path_1.join)(app_root_path_1.path, 'logs');
const isDev = process.env['NODE_ENV'] === 'development';
const isTest = process.env['NODE_ENV'] === 'test';
const appName = (_a = process.env['APP_NAME']) !== null && _a !== void 0 ? _a : 'SEERSLAB';
const datePattern = 'YY-MM-DD';
const timezone = () => {
    return new Date().toLocaleString('EU', {
        timeZone: 'Asia/Seoul',
    });
};
exports.default = winston_1.default.createLogger({
    level: isDev ? 'debug' : 'info',
    // defaultMeta: { service: appName },
    format: winston_1.default.format.combine(winston_1.default.format.simple(), winston_1.default.format.timestamp({ format: timezone })),
    silent: isTest,
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple(), winston_1.default.format.timestamp()),
        }),
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
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
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
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
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
            level: 'info',
            datePattern,
            dirname: `${logDir}/info`,
            filename: `%DATE%.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true,
            silent: isTest,
        }),
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
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
//# sourceMappingURL=logger.config.js.map