import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FilterRequest implements NestInterceptor {
  private logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.removeHeader('X-Powered-By');
    this.logger.debug('[FILTER] Before...\nAuthorizationFilter.intercept() extends NestInterceptor');

    return next.handle().pipe();
  }
}
