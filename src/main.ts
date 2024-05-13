import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";

import logger from "./configs/logger.config";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./domains/shared/filters/exception.common";
import { configDotenv } from "./configs/dotenv.config";

import * as path from "path";

declare const module: any;

async function bootstrap() {
  const app = (await import("./configs/express.config")).default;
  const appNest = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(app)
  );
  const port = Number(process.env["APP_PORT"]) || 3001;

  // Exception filter
  appNest.useGlobalFilters(new HttpExceptionFilter());

  appNest.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO 이외의 속성은 무조건 거른다.
      forbidNonWhitelisted: false, // 정의된 Parameter 없는(모자란) 경우 Error 발생 여부
      transform: true, // DTO 자동 변환 여부(true/false)
      disableErrorMessages: true, // Error 발생시 Error Message 포함 여부(true: 포함, false: 비포함)
    })
  );

  appNest.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  appNest.use("/google_test", function (req: any, res: any) {
    console.log(req, res);
    console.log(path.join(__dirname, "../src/google_sign_in.html"));
    res.sendFile(path.join(__dirname, "../src/google_sign_in.html"));
  });

  appNest.use("/kakao_test", function (req: any, res: any) {
    console.log(req, res);
    console.log(path.join(__dirname, "../src/kakao.html"));
    res.sendFile(path.join(__dirname, "../src/kakao.html"));
  });

  const server = await appNest.listen(port, () => {
    logger.info(`Nest.js API-Server ready to http://localhost:${port}/`);
  });

  // gracefully shutdown
  server.on("SIGINT", () => {
    // TODO: complete this
    logger.error("[ERROR] SIGINT..");
  });

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => appNest.close());
  }
}

configDotenv();
bootstrap();
