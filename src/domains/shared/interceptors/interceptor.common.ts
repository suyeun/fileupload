import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResult, HttpResponse } from '../interfaces';
import { healthcheck } from '../../../utils';

/**  @author GG
 *   @description inbound request interceptor
 *
 *   @param context current execution context object
 *   @param next next handler call */
@Injectable()
export class CachedInterceptor implements NestInterceptor {
  private logger = new Logger(this.constructor.name);
  intercept = (context: ExecutionContext, next: CallHandler): Observable<any> => {
    const request = context.switchToHttp().getRequest();
    const beginDate = Date.now();
    context.switchToHttp().getResponse().removeHeader('X-Powered-By');

    // this.logger.debug('[RUN] CachedInterceptor(NestInterceptor)@intercept()');

    if (context.switchToHttp().getRequest().url.includes('favicon')) {
      context.switchToHttp().getResponse().status(204);
      /**
       * todo : 이후 하드코드된 부분을 요청을 동적제어 방식으로 수정 해야함
       *        white-list, black-list 중 선택 할 것
       *        상시 차단과 한시적인 특화 차단의 경우를 분리해서 모듈화 할것  */
      this.logger.debug(`blocked -> ${request.url} / ${request.ip}`);

      return of(204);
      // throw ForbiddenException;
    }
    /** todo : URL Filter - white-list, black-list 모듈화 할것 */
    if (request.url.includes('healthcheck')) {
      this.logger.debug(`request URL -> ${request.url}`);

      return of(healthcheck());
    }

    return next.handle().pipe(
      tap(() => {
        const rapTime = Date.now() - beginDate;
        if (rapTime > 100) {
          this.logger.warn(`long request - ${rapTime}ms`);
        } else {
          this.logger.debug(`to complete - ${rapTime}ms`);
        }
      }),
      map((rsData: any) => {
        if (<HttpResponse>rsData) {
          return rsData;
        } else {
          // 표준 응답 구조가 아닌 경우
          return <ApiResult>{
            status: 200,
            command: rsData,
            // failedMessage: 'error message..',
          };
        }
      }),
    );
  };
}
