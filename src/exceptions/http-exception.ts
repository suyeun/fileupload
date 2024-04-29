import { HttpException as NestHttpException, HttpStatus } from '@nestjs/common';
import { NETWORK_ERROR_CODE } from '../constants';

export class HttpException extends NestHttpException {
  public readonly code: number; // for custom error code. if you don't need it, set 0.

  constructor(message: string, status: number, code?: number) {
    super(message, status);

    this.code = code ?? 0;
  }
}

export function exceptionResult(
  text: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
  code: number = NETWORK_ERROR_CODE.FAIL,
) {
  return new HttpException(text, status, code);
}
