import { HttpStatus } from "@nestjs/common";

import { HttpMethods } from "../type.defines";
import { localDatetime } from "../../../utils";
import logger from "../../../configs/logger.config";

export interface HttpResponse {
  status?: boolean | HttpStatus;
  message?: string;
  command?: any;
  timestamp?: string | number;
}

type OptString = string | undefined;

export function JsonResponse(
  data: any,
  status: HttpStatus = HttpStatus.OK,
  text?: OptString
): HttpResponse {
  logger.debug(`[JsonResponse] ${status} ${text}`);
  return <HttpResponse>{
    status: status,
    message: text,
    command: data,
    timestamp: localDatetime(),
  };
}

export function responseJson(opt: {
  data: any;
  state?: HttpStatus;
  text?: OptString;
}): HttpResponse {
  return JsonResponse(opt.data, opt.state, opt.text);
}

/**
 * MirrorCity legacy project only..
 */
export interface ApiResult {
  status: number;
  command: any;
  failedMessage?: string;
}

export interface BaseResponse<T = any> {
  result: boolean;
  message: string;
  data?: T | T[];
  timestamp?: string | number;
}

export interface BasicResponse<T = any> extends BaseResponse<T> {
  data: T;
}

export interface ListResponse<T = any> extends BaseResponse<T> {
  count: number;
  data: T[];
}

export interface HttpError {
  status: number;
  path: string;
  method: HttpMethods;
  isAccessTokenExpired: boolean;
  isRefreshTokenExpired: boolean;
  request: {
    headers: any;
    query: any;
    params: any;
    body: any;
  };
  timestamp?: string | number;
}

export interface ErrorResponse extends BaseResponse<HttpError> {
  result: false;
}
