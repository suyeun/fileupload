import { Injectable, Request, Response, Body } from "@nestjs/common";
import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { ExcelRepository } from "../repositories";
import { JsonResponse } from "../../shared/interfaces";
import { ExcelData } from "../interfaces";
import { nanoid } from "nanoid";
import * as CALENDAR_DTO from "../dto";
import { AwsClient } from "google-auth-library";

@Injectable()
export class ExcelService {
  constructor(private readonly excelRepository: ExcelRepository) {}

  async random(userId: number) {
    const accId = userId || 1;

    const result = [
      10, 12, 13, 14, 15, 11, 16, 10, 17, 18, 11, 19, 10, 11, 20, 21, 10, 22,
      11, 23, 24, 11, 25, 26,
    ];
    const randomValue = result[Math.floor(Math.random() * result.length)];
    const point = randomValue;
    if (!point)
      return JsonResponse([], ERROR_CODE.INVALID_INPUT, "INVALID_INPUT");

    return JsonResponse({ point }, 200, "OK");
  }
}
