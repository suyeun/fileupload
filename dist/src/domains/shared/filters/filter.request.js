"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterRequest = void 0;
const common_1 = require("@nestjs/common");
let FilterRequest = class FilterRequest {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
    }
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        response.removeHeader('X-Powered-By');
        this.logger.debug('[FILTER] Before...\nAuthorizationFilter.intercept() extends NestInterceptor');
        return next.handle().pipe();
    }
};
FilterRequest = __decorate([
    (0, common_1.Injectable)()
], FilterRequest);
exports.FilterRequest = FilterRequest;
//# sourceMappingURL=filter.request.js.map