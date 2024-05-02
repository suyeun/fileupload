"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../utils");
let HttpExceptionFilter = class HttpExceptionFilter {
    /**
     * @description Common HTTP Exception
     *
     * @param exception current exception object
     * @param host ArgumentsHost -> handler & arguments getter
     * (Express : Response, Request, Next )
     */
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception === null ? common_1.HttpStatus.BAD_REQUEST : exception.getStatus();
        const timestamp = (0, utils_1.localDatetime)();
        /** @description HttpException data usage */
        const res = exception.getResponse();
        this.errorPrint(ctx, status, timestamp);
        response.status(status).json({
            status: common_1.HttpStatus.OK === status,
            result: status,
            message: res.message,
            timestamp: timestamp,
        });
    }
    errorPrint(ctx, status, timestamp) {
        const { method, originalUrl, params, query, body, headers } = ctx.getRequest();
        (0, utils_1.toJsonPrint)({
            request: `CODE|${status} METHOD|${method} PATH|${originalUrl}`,
            data: 'GET' === method ? { params: params, query: query } : { params: params, body: body },
            headers: headers,
            timestamp: timestamp,
        });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=exception.common.js.map