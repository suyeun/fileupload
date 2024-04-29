import { Logger } from '@nestjs/common';
import { Buffer } from 'node:buffer';

export function getLogger(loggingPrefix?: string) {
  return new Logger(loggingPrefix ?? 'Unknown');
}

export const strEncoder = (
  str: string,
  source_encode: BufferEncoding = 'utf8',
  target_encode: BufferEncoding = 'utf8',
) => {
  if (source_encode === target_encode) return str;
  const buff = Buffer.from(str, source_encode);
  return buff.toString(target_encode);
};
