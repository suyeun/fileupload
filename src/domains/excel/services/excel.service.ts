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
      month: string;
      companyCnt: number;
      userCnt: number;
      amount: string;
      charge: string;
      deposit: Date;
      settlement: string;
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

  async load() {
    const res = await this.excelRepository.load();
    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }

  async dispatchRandom(file: any) {
    //정산 월	거래처명	인원수	청구금액	수수료	수수료 지급기준	청구기간	입금일자	세금계산서 발행일	정산 수수료	정산일자
    interface DataEntry {
      month: string;
      name: string;
      personnelCount: number;
      amount: string;
      commission: string;
      commissionPaymentStandard: string;
      claimPeriod: string;
      depositDate: Date;
      taxInvoice: string;
      issueDate: Date;
      settlementCommission: string;
      settlementDate: Date;
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

    const data: DataEntry[] = rawData.map((row: any) => {
      const [
        month,
        name,
        personnelCount,
        amount,
        commission,
        commissionPaymentStandard,
        claimPeriod,
        depositDate,
        taxInvoice,
        issueDate,
        settlementCommission,
        settlementDate,
      ] = row;

      const fields = [
        month,
        name,
        personnelCount,
        amount,
        commission,
        commissionPaymentStandard,
        claimPeriod,
        depositDate,
        taxInvoice,
        issueDate,
        settlementCommission,
        settlementDate,
      ];

      const depositDateDate = new Date(depositDate);
      depositDateDate.setHours(depositDateDate.getHours() + 9);
      const issueDateDate = new Date(issueDate);
      issueDateDate.setHours(issueDateDate.getHours() + 9);
      const settlementDateDate = new Date(settlementDate);
      settlementDateDate.setHours(settlementDateDate.getHours() + 9);

      return {
        month,
        name,
        personnelCount,
        amount,
        commission,
        commissionPaymentStandard,
        claimPeriod,
        depositDate: depositDateDate,
        taxInvoice,
        issueDate: issueDateDate,
        settlementCommission,
        settlementDate: settlementDateDate,
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
          !entry.depositDate ||
          !entry.settlementDate
        )
          return;

        const result = await this.excelRepository.dispatchCreateExcelData(
          entry.month.toString(),
          entry.name,
          entry.personnelCount,
          entry.amount,
          entry.commission,
          entry.commissionPaymentStandard,
          entry.claimPeriod,
          entry.depositDate,
          entry.taxInvoice,
          entry.issueDate,
          entry.settlementCommission,
          entry.settlementDate
        );
        return result;
      })
    );
  }
  async dispatchLoad() {
    const res = await this.excelRepository.dispatchLoad();
    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }
}
