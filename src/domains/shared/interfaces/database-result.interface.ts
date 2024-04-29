import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Logger } from '@nestjs/common';

type RS_CUD_SQL = InsertResult | UpdateResult | DeleteResult;

export interface CommonResponse<T> {
  success?: boolean;
  data: T | null;
  message?: string;
}

class DatabaseResponse<T> implements CommonResponse<T> {
  constructor(
    public data: T | null = null,
    public success?: boolean,
    public message?: string,
  ) {
    if (this.data) this.assessQueryBuilder(data);
  }

  private assessQueryBuilder(data: any) {
    this.success = evaluateOK(data);
    this.message = this.success ? Query.OK : Query.Fail;
  }

  get hasError() {
    return this.success !== true;
  }
}

export const ResultSQL = DatabaseResponse;

export const resultSQL = (data: any) => new ResultSQL(data);

export const adtResultSQL = <T>(result: any) => {
  const dbResponse = new DatabaseResponse<T>();
  dbResponse.data = result;
  dbResponse.success = !!result;
  dbResponse.message = dbResponse.success ? Query.OK : Query.Fail;

  return dbResponse;
};
export const Execute = { OK: true, Fail: false, Error: false };

export const Query = { OK: 'success', Fail: 'fail', Error: 'exception' };

// B:TypeGuard
export function isInsertResult(result: any): result is InsertResult {
  // return result && typeof result.affected === 'number';
  return result instanceof InsertResult && typeof result.generatedMaps !== 'undefined';
}

export function isUpdateResult(result: any): result is UpdateResult {
  return result instanceof UpdateResult && typeof result.affected === 'number';
}

export function isDeleteResult(result: any): result is DeleteResult {
  return result instanceof DeleteResult && typeof result.affected === 'number';
}

// E:TypeGuard

export function getAssessAffectCount(result: RS_CUD_SQL): number {
  if (isInsertResult(result)) {
    // from QueryResult.affected <- identifiers: ObjectLiteral[] : because return length
    return result.generatedMaps.length;
  } else if (isUpdateResult(result)) {
    return result.affected as number;
  } else if (isDeleteResult(result)) {
    return result.affected as number;
  } else {
    // throw new Error('Invalid result type');
    return 0;
  }
}

export function evaluateOK(resultSet: RS_CUD_SQL) {
  return getAssessAffectCount(resultSet) > 0;
}

export function exceptionSQL(text: string = '', error?: any) {
  Logger.error(error);
  // throw new HttpException(text, HttpStatus.BAD_REQUEST, ERROR_CODE.INVALID_PASSWORD_ERROR);
  return new ResultSQL(text);
}
