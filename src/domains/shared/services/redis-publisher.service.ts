import { Inject, Injectable } from '@nestjs/common';

import { Redis } from 'ioredis';

@Injectable()
export class RedisPublisherService {
  private readonly publisher: Redis;

  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {
    this.publisher = this.redisClient.duplicate();
    console.log(this.publisher);
  }
}
