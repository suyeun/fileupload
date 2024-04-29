import { APP_INTERCEPTOR } from '@nestjs/core';
import { CachedInterceptor } from './interceptor.common';

export const InterceptorModule = [
  {
    provide: APP_INTERCEPTOR,
    useClass: CachedInterceptor,
  },
];
