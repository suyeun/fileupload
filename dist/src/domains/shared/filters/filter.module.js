"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterModule = void 0;
const core_1 = require("@nestjs/core");
const filter_request_1 = require("./filter.request");
exports.FilterModule = [
    {
        provide: core_1.APP_FILTER,
        useClass: filter_request_1.FilterRequest,
    },
];
//# sourceMappingURL=filter.module.js.map