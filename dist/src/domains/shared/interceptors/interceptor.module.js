"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorModule = void 0;
const core_1 = require("@nestjs/core");
const interceptor_common_1 = require("./interceptor.common");
exports.InterceptorModule = [
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: interceptor_common_1.CachedInterceptor,
    },
];
//# sourceMappingURL=interceptor.module.js.map