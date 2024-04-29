import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { exceptionResult } from '../../../exceptions/http-exception';
import { HttpConfigService } from './http.config';

@Injectable()
export class RequestService {
  private readonly options = {
    timeout: 5000,
    maxRedirects: 5,
  };

  constructor(private readonly httpService: HttpService) {}

  async get<T = any>(url: string, options = this.options) {
    const request = this.httpService
      .get<T>(url, options)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw exceptionResult('Failed HTTP request..');
        }),
      );

    return await lastValueFrom(request);
  }

  async find<T = any>(url: string, options = this.options) {
    const result = await this.httpService.axiosRef.get<T>(url, options);

    return result.data;
  }
}
