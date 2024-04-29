import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RequestService } from './http.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 1000,
      maxRedirects: 5,
    }),
  ],
  providers: [RequestService],
  exports: [RequestService],
})
export class HttpRequestModule {}
