"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionResult = exports.HttpException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
class HttpException extends common_1.HttpException {
    constructor(message, status, code) {
        super(message, status);
        this.code = code !== null && code !== void 0 ? code : 0;
    }
}
exports.HttpException = HttpException;
function exceptionResult(text, status = common_1.HttpStatus.BAD_REQUEST, code = constants_1.NETWORK_ERROR_CODE.FAIL) {
    return new HttpException(text, status, code);
}
exports.exceptionResult = exceptionResult;
//# sourceMappingURL=http-exception.js.map