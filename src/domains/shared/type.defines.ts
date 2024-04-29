/**
 * @Auth : GG
 * Convenience bundle of required type definitions
 */

export type DATA_SOURCE_TYPE = 'mysql' | 'mariadb' | undefined;

export type CHARSET_TYPE = 'utf8mb4_unicode_ci' | 'utf8mb4_general_ci' | 'utf8mb4' | 'utf8mb4_0900_ai_ci';

export const TimeZone_KR = '+09:00';
export const RedisReTryCount = 3;

export type MulterFile = Express.Multer.File;

export type ArrayMulterFiles = Array<MulterFile>;

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
