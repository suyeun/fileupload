"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCacheModule = void 0;
const cache_module_1 = require("@nestjs/cache-manager/dist/cache.module");
const config_1 = require("@nestjs/config");
const RedisCacheManager = __importStar(require("cache-manager-ioredis"));
const logger_config_1 = __importDefault(require("../configs/logger.config"));
exports.WebCacheModule = cache_module_1.CacheModule.registerAsync({
    isGlobal: true,
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        isGlobal: true,
        store: RedisCacheManager,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        db: 1,
        ttl: 360,
        showFriendlyErrorStack: true,
        noDelay: false,
        retryStrategy: (times) => {
            if (times > 3)
                throw new Error('RedisWebCacheModule re-connection failed, over count..');
            logger_config_1.default.warn(`try to re-connect RedisWebCacheModule after 10s...`);
            return Math.min(times * 10 * 1000, 10 * 1000);
        },
    }),
});
//# sourceMappingURL=redis.config.js.map