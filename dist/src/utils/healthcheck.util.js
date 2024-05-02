"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthcheck = void 0;
const v8_1 = __importDefault(require("v8"));
const healthcheck = () => {
    const processId = process.pid;
    const initialMemory = v8_1.default.getHeapStatistics().total_available_size;
    const usedMemory = process.memoryUsage().rss;
    return {
        processId,
        initialMemory,
        usedMemory,
        status: 'OK',
    };
};
exports.healthcheck = healthcheck;
//# sourceMappingURL=healthcheck.util.js.map