"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../../utils");
/**  @author GG
 *   @description inbound request interceptor
 *
 *   @param context current execution context object
 *   @param next next handler call */
let CachedInterceptor = class CachedInterceptor {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
        this.intercept = (context, next) => {
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
                return (0, rxjs_1.of)(204);
                // throw ForbiddenException;
            }
            /** todo : URL Filter - white-list, black-list 모듈화 할것 */
            if (request.url.includes('healthcheck')) {
                this.logger.debug(`request URL -> ${request.url}`);
                return (0, rxjs_1.of)((0, utils_1.healthcheck)());
            }
            return next.handle().pipe((0, rxjs_1.tap)(() => {
                const rapTime = Date.now() - beginDate;
                if (rapTime > 100) {
                    this.logger.warn(`long request - ${rapTime}ms`);
                }
                else {
                    this.logger.debug(`to complete - ${rapTime}ms`);
                }
            }), (0, rxjs_1.map)((rsData) => {
                if (rsData) {
                    return rsData;
                }
                else {
                    // 표준 응답 구조가 아닌 경우
                    return {
                        status: 200,
                        command: rsData,
                        // failedMessage: 'error message..',
                    };
                }
            }));
        };
    }
};
CachedInterceptor = __decorate([
    (0, common_1.Injectable)()
], CachedInterceptor);
exports.CachedInterceptor = CachedInterceptor;
//# sourceMappingURL=interceptor.common.js.map