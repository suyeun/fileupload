"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strEncoder = exports.getLogger = void 0;
const common_1 = require("@nestjs/common");
const node_buffer_1 = require("node:buffer");
function getLogger(loggingPrefix) {
    return new common_1.Logger(loggingPrefix !== null && loggingPrefix !== void 0 ? loggingPrefix : 'Unknown');
}
exports.getLogger = getLogger;
const strEncoder = (str, source_encode = 'utf8', target_encode = 'utf8') => {
    if (source_encode === target_encode)
        return str;
    const buff = node_buffer_1.Buffer.from(str, source_encode);
    return buff.toString(target_encode);
};
exports.strEncoder = strEncoder;
//# sourceMappingURL=string.utils.js.map