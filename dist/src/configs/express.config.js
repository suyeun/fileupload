"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
//import helmet from 'helmet';
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
//app
//  .use(helmet())
//  .use(helmet.hsts()) // (SSL/TLS-HTTP) 연결을 적용하는 Strict-Transport-Security 헤더를 설정
//  .use(helmet.ieNoOpen()) //IE8 이상에 대해 X-Download-Options를 설정
//  .use(helmet.noSniff()) // X-Content-Type-Options 선언된 콘텐츠 유형으로부터 벗어난 응답에 브라우저의 MIME 가로채기를 방지
//  .use(helmet.xssFilter()) // X-XSS-Protection을 설정하여 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용
//  .use(helmet.hidePoweredBy()); // X-Powered-By 헤더를 제거
// .use(helmet.contentSecurityPolicy())
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
exports.default = app;
//# sourceMappingURL=express.config.js.map