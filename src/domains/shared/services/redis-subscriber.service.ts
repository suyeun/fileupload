import { Inject, Injectable } from '@nestjs/common';

import { Redis } from 'ioredis';

@Injectable()
export class RedisSubscriberService {
  private readonly subscriber: Redis;

  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {
    this.subscriber = this.redisClient.duplicate();
    console.log(this.subscriber);
  }
}
