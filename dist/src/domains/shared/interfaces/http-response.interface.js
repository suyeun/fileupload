"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseJson = exports.JsonResponse = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../utils");
const logger_config_1 = __importDefault(require("../../../configs/logger.config"));
function JsonResponse(data, status = common_1.HttpStatus.OK, text) {
    logger_config_1.default.debug(`[JsonResponse] ${status} ${text}`);
    return {
        status: status,
        message: text,
        command: data,
        timestamp: (0, utils_1.localDatetime)(),
    };
}
exports.JsonResponse = JsonResponse;
function responseJson(opt) {
    return JsonResponse(opt.data, opt.state, opt.text);
}
exports.responseJson = responseJson;
//# sourceMappingURL=http-response.interface.js.map