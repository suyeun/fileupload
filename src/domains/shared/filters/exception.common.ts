import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { datetime, localDatetime, toJsonPrint } from '../../../utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @description Common HTTP Exception
   *
   * @param exception current exception object
   * @param host ArgumentsHost -> handler & arguments getter
   * (Express : Response, Request, Next )
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception === null ? HttpStatus.BAD_REQUEST : exception.getStatus();
    const timestamp = localDatetime();

    /** @description HttpException data usage */
    const res: any = exception.getResponse();
    this.errorPrint(ctx, status, timestamp);

    response.status(status).json({
      status: HttpStatus.OK === status,
      result: status,
      message: res.message,
      timestamp: timestamp,
    });
  }

  private errorPrint(ctx: HttpArgumentsHost, status: number, timestamp: string) {
    const { method, originalUrl, params, query, body, headers } = ctx.getRequest();
    toJsonPrint({
      request: `CODE|${status} METHOD|${method} PATH|${originalUrl}`,
      data: 'GET' === method ? { params: params, query: query } : { params: params, body: body },
      headers: headers,
      timestamp: timestamp,
    });
  }
}
