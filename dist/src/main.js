"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const logger_config_1 = __importDefault(require("./configs/logger.config"));
const app_module_1 = require("./app.module");
const exception_common_1 = require("./domains/shared/filters/exception.common");
const dotenv_config_1 = require("./configs/dotenv.config");
const path = __importStar(require("path"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (yield Promise.resolve().then(() => __importStar(require("./configs/express.config")))).default;
        const appNest = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(app));
        const port = Number(process.env["APP_PORT"]) || 3001;
        // Exception filter
        appNest.useGlobalFilters(new exception_common_1.HttpExceptionFilter());
        appNest.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
            disableErrorMessages: true, // Error 발생시 Error Message 포함 여부(true: 포함, false: 비포함)
        }));
        appNest.enableCors({
            origin: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
        });
        appNest.use("/google_test", function (req, res) {
            console.log(req, res);
            console.log(path.join(__dirname, "../src/google_sign_in.html"));
            res.sendFile(path.join(__dirname, "../src/google_sign_in.html"));
        });
        appNest.use("/kakao_test", function (req, res) {
            console.log(req, res);
            console.log(path.join(__dirname, "../src/kakao.html"));
            res.sendFile(path.join(__dirname, "../src/kakao.html"));
        });
        const server = yield appNest.listen(port, () => {
            logger_config_1.default.info(`Nest.js API-Server ready to http://localhost:${port}/`);
        });
        // gracefully shutdown
        server.on("SIGINT", () => {
            // TODO: complete this
            logger_config_1.default.error("[ERROR] SIGINT..");
        });
        // hot reload
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => appNest.close());
        }
    });
}
(0, dotenv_config_1.configDotenv)();
bootstrap();
//# sourceMappingURL=main.js.map