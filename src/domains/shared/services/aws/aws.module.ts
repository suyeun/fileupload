import { Module } from '@nestjs/common';
import { AWSService } from './aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true /* set global class */ })],
  providers: [AWSService],
  exports: [AWSService],
})
export class AwsModule {}
