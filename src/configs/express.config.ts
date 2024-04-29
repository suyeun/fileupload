import compression from 'compression';
import express from 'express';
//import helmet from 'helmet';

const app = express();

app.use(compression());
//app
//  .use(helmet())
//  .use(helmet.hsts()) // (SSL/TLS-HTTP) 연결을 적용하는 Strict-Transport-Security 헤더를 설정
//  .use(helmet.ieNoOpen()) //IE8 이상에 대해 X-Download-Options를 설정
//  .use(helmet.noSniff()) // X-Content-Type-Options 선언된 콘텐츠 유형으로부터 벗어난 응답에 브라우저의 MIME 가로채기를 방지
//  .use(helmet.xssFilter()) // X-XSS-Protection을 설정하여 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용
//  .use(helmet.hidePoweredBy()); // X-Powered-By 헤더를 제거
// .use(helmet.contentSecurityPolicy())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
