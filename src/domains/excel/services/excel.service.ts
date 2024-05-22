import { Injectable, Request, Response, Body } from "@nestjs/common";
import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { ExcelRepository } from "../repositories";
import { JsonResponse } from "../../shared/interfaces";
import { ExcelData, DataEntry, ExcelDispatch } from "../interfaces";
import { nanoid } from "nanoid";
import * as CALENDAR_DTO from "../dto";
import * as XLSX from "xlsx";
@Injectable()
export class ExcelService {
  constructor(private readonly excelRepository: ExcelRepository) {}

  async findAll() {
    //const res = await this.excelRepository.findAll();
    const res = {
      labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
      dataset1: [65, 59, 80, 81, 56, 55], //업체수
      dataset2: [28, 48, 40, 19, 86, 27], //파견인원
      dataset3: [10, 20, 30, 40, 50, 60], //채용대행인원
      dataset4: [65, 59, 80, 81, 56, 55], //수수료
      dataset5: [28, 48, 40, 19, 86, 27], //수익
    };

    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }

  async upload(file: any) {
    const workbook = XLSX.read(file.buffer, {
      type: "buffer",
      cellDates: true,
      dateNF: "yyyy-mm-dd",
    });

    // 첫번째 sheet 의 이름을 조회합니다.
    const sheetName = workbook.SheetNames[0];
    const sheetNameOne = workbook.SheetNames[1];
    const sheetNameTwo = workbook.SheetNames[2];

    if (sheetNameOne) {
      console.log("!!!!!");
      const worksheetOne = workbook.Sheets[sheetNameOne];
      await this.createExcelData(worksheetOne, "A");
    }

    if (sheetNameTwo) {
      console.log("22222");
      const worksheetTwo = workbook.Sheets[sheetNameTwo];
      await this.createExcelData(worksheetTwo, "B");
    }

    if (!sheetName) return;
    // 첫번째 sheet 를 사용합니다.
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) return;

    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      header: 1,
      range: 2,
    });

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

    const res = await Promise.all(
      data.map(async (entry) => {
        if (
          !entry.month ||
          !entry.amount ||
          !entry.charge ||
          !entry.deposit ||
          !entry.amountDay
        )
          return;

        const result = await this.excelRepository.createExcelData(
          entry.month.toString(),
          entry.companyCnt,
          entry.userCnt,
          entry.amount.toString(),
          entry.charge,
          entry.deposit,
          entry.settlement,
          entry.amountDay,
          "first",
          "DONE"
        );
        return result;
      })
    );

    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }

  async createExcelData(worksheet: any, type: string) {
    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      header: 1,
      range: 2,
    });

    const data: ExcelDispatch[] = rawData.map((row: any) => {
      const [
        month,
        name,
        personnelCount,
        amount,
        commission,
        commissionPaymentStandard,
        claimPeriod,
        depositDate,
        issueDate,
        settlementCommission,
        settlementDate,
      ] = row;

      const deposit = new Date(depositDate);
      deposit.setHours(deposit.getHours() + 9);
      const issueDay = new Date(issueDate);
      issueDay.setHours(issueDay.getHours() + 9);

      const settlement = new Date(settlementDate);
      settlement.setHours(settlement.getHours() + 9);

      return {
        month,
        name,
        personnelCount,
        amount,
        commission,
        commissionPaymentStandard,
        claimPeriod,
        depositDate: deposit,
        issueDate,
        settlementCommission,
        settlementDate: settlement,
        type: type,
      };
    });
    const res = await Promise.all(
      data.map(async (entry) => {
        if (
          !entry.month ||
          !entry.name ||
          !entry.personnelCount ||
          !entry.amount ||
          !entry.commission ||
          !entry.commissionPaymentStandard ||
          !entry.claimPeriod ||
          !entry.depositDate ||
          !entry.issueDate ||
          !entry.settlementCommission ||
          !entry.settlementDate
        )
          return;
        const result = await this.excelRepository.createExcelDispatchData(
          entry.month.toString(),
          entry.name,
          entry.personnelCount,
          entry.amount.toString(),
          entry.commission,
          entry.commissionPaymentStandard,
          entry.claimPeriod,
          entry.depositDate,
          entry.issueDate,
          entry.settlementCommission,
          entry.settlementDate,
          type
        );
        return result;
      })
    );
  }

  async load() {
    const res = await this.excelRepository.load();
    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }

  async loadDispatch(type: string) {
    const res = await this.excelRepository.dispatchLoad(type);
    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }
}
