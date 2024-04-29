import { Controller, Get, HttpCode, UseInterceptors } from "@nestjs/common";

import { CachedInterceptor } from "./domains/shared/interceptors/interceptor.common";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  start() {
    const date = new Date().toLocaleString();

    return { service: "index", value: `Nest.js ${date}` };
  }

  @Get("/favicon.ico")
  @HttpCode(204)
  denyFavicon(): any {
    return { code: 204 };
  }

  @Get("/api/v2/healthcheck")
  @UseInterceptors(CachedInterceptor)
  healthcheck(): any {}
}
