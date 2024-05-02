import {
  Controller,
  Post,
  Request,
  HttpStatus,
  HttpCode,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import * as POINT_DTO from "../dto";
import { ExcelService } from "../services";

import { TokenAuthGuard } from "../../shared/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import * as XLSX from "xlsx";
import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { JsonResponse } from "../../shared/interfaces";

@UseGuards(TokenAuthGuard)
@Controller("api/v1/file")
export class PointController {
  constructor(private readonly excelService: ExcelService) {}

  @HttpCode(HttpStatus.OK)
  @Post("me")
  list(@Body() body: any, @Request() req: any) {
    console.log(body);
    const accId = req.headers.accId;
    return this.excelService.random(accId);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async handleExcel(@UploadedFile() file: any) {
    interface DataEntry {
      month: number;
      companyCnt: number;
      userCnt: number;
      amount: number;
      charge: number;
      deposit: Date;
      settlement: number;
      amountDay: Date;
    }

    const workbook = XLSX.read(file.buffer, {
      type: "buffer",
      cellDates: true,
      dateNF: "yyyy-mm-dd",
    });

    // 첫번째 sheet 의 이름을 조회합니다.
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) return;
    // 첫번째 sheet 를 사용합니다.
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) return;

    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      header: 1,
      range: 2,
    });
    let check = 0;
    const data: DataEntry[] = rawData.map((row: any) => {
      const [
        month,
        companyCnt,
        userCnt,
        amount,
        charge,
        deposit,
        settlement,
        amountDay,
      ] = row;

      const fields = [
        month,
        companyCnt,
        userCnt,
        amount,
        charge,
        deposit,
        settlement,
        amountDay,
      ];
      for (const value of fields) {
        if (value === null || value === undefined || value === "") {
          check = check + 1;
        }
      }
      const depositDate = new Date(deposit);
      depositDate.setHours(depositDate.getHours() + 9);
      const amountDayDate = new Date(amountDay);
      amountDayDate.setHours(amountDayDate.getHours() + 9);
      return {
        month,
        companyCnt,
        userCnt,
        amount,
        charge,
        deposit: depositDate,
        settlement,
        amountDay: amountDayDate,
      };
    });

    //if (check > 0)
    //  return JsonResponse({}, ERROR_CODE.INVALID_INPUT, "INVALID_INPUT");
    return JsonResponse(data, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }
}
