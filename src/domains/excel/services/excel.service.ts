import { Injectable, Request, Response, Body } from "@nestjs/common";
import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { ExcelRepository } from "../repositories";
import { JsonResponse } from "../../shared/interfaces";
import { ExcelData } from "../interfaces";
import { nanoid } from "nanoid";
import * as CALENDAR_DTO from "../dto";
import * as XLSX from "xlsx";
@Injectable()
export class ExcelService {
  constructor(private readonly excelRepository: ExcelRepository) {}

  async random(file: any) {
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
      this.excelRepository.createExcelData(
        month.trim(),
        companyCnt.trim(),
        userCnt.trim(),
        amount.trim(),
        charge.trim(),
        depositDate,
        settlement.trim(),
        amountDayDate
      );
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
