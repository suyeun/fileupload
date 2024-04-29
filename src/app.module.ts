import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import * as DomainModules from "./domains";
import { OrmDataSource } from "./configs/typeorm.config";
import { FilterModule } from "./domains/shared/filters/filter.module";
import { AppController } from "./app.controller";
import { LoggerMiddleware } from "./domains/shared/services/logger.middleware";
import { InterceptorModule } from "./domains/shared/interceptors/interceptor.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    OrmDataSource,
    ...Object.values(DomainModules),
  ],
  controllers: [AppController],
  providers: [...FilterModule, ...InterceptorModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude("/", "/favicon.ico")
      .forRoutes("*");
  }
}
