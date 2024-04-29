import { CacheModule } from '@nestjs/cache-manager/dist/cache.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';
import * as RedisCacheManager from 'cache-manager-ioredis';
import logger from '../configs/logger.config';

export const WebCacheModule = CacheModule.registerAsync<RedisOptions>({
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    isGlobal: true,
    store: RedisCacheManager,
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
    password: configService.get<string>('REDIS_PASSWORD'),
    db: 1,
    ttl: 360,
    showFriendlyErrorStack: true,
    noDelay: false,
    retryStrategy: (times: number) => {
      if (times > 3) throw new Error('RedisWebCacheModule re-connection failed, over count..');

      logger.warn(`try to re-connect RedisWebCacheModule after 10s...`);

      return Math.min(times * 10 * 1000, 10 * 1000);
    },
  }),
});
