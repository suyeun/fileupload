import { Injectable, Request, Response, Body } from "@nestjs/common";
import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { ExcelRepository } from "../repositories";
import { JsonResponse } from "../../shared/interfaces";
import { ExcelData, DataEntry, ExcelDispatch } from "../interfaces";
import { nanoid } from "nanoid";
import * as CALENDAR_DTO from "../dto";
import * as XLSX from "xlsx";
import { AWSService } from "./aws.service";
@Injectable()
export class ExcelService {
  constructor(
    private readonly excelRepository: ExcelRepository,
    private readonly awsService: AWSService
  ) {}

  async getHistory() {
    const res = await this.excelRepository.getHistory();
    return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
  }

  async fileUpload(
    file: Express.Multer.File,
    title: string,
    description: string
  ) {
    // Handle the file, name, and content here
    // For example, save the file to a database or file system

    const name = title || nanoid(10);
    const descriptionText = description || file.originalname;
    const filePath = file.originalname;
    if (!file) {
      return JsonResponse([], 500, "No file uploaded");
    }
    const res = await this.awsService.imgUploadFromFileDto(file);
    //파일이름
    console.log("!!!!", name, descriptionText, filePath);
    const result = await this.excelRepository.imgUploadFromFileDto(
      name,
      descriptionText,
      "https://test-workpick.s3.ap-northeast-2.amazonaws.com/images/" + filePath
    );

    // Return a response
    return {
      originalname: file.originalname,
      result,
    };
  }

  async findAll(filter: any) {
    const result = await this.excelRepository.findAll();

    const dataset1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize an array with 12 zeros
    if (result.res) {
      result.res.forEach((element: any) => {
        const month = parseInt(element.month, 10); // Convert month to integer
        if (month >= 1 && month <= 12) {
          dataset1[month - 1] += element.companyCnt; // Update the appropriate index
        }
      });
    }

    //month, personnelCount
    const dataset2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize an array with 12 zeros
    if (result.res2) {
      result.res2.forEach((element: any) => {
        const month = parseInt(element.month, 10); // Convert month to integer
        if (month >= 1 && month <= 12) {
          dataset2[month - 1] += element.personnelCount; // Update the appropriate index
        }
      });
    }

    //month, personnelCount
    const dataset3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize an array with 12 zeros
    if (result.res3) {
      result.res3.forEach((element: any) => {
        const month = parseInt(element.month, 10); // Convert month to integer
        if (month >= 1 && month <= 12) {
          dataset3[month - 1] += element.personnelCount; // Update the appropriate index
        }
      });
    }

    //두번째 차트 ( 수수료 charge, 수익 settlement )
    const dataset4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize an array with 12 zeros
    if (result.res) {
      result.res.forEach((element: any) => {
        const month = parseInt(element.month, 10); // Convert month to integer
        if (month >= 1 && month <= 12) {
          const number = parseInt(element.charge.replace(/,/g, ""), 10);
          dataset4[month - 1] += number; // Update the appropriate index
        }
      });
    }

    const dataset5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize an array with 12 zeros
    if (result.res) {
      result.res.forEach((element: any) => {
        const month = parseInt(element.month, 10); // Convert month to integer
        if (month >= 1 && month <= 12) {
          const number = parseInt(element.settlement.replace(/,/g, ""), 10);
          dataset5[month - 1] += number; // Update the appropriate index
        }
      });
    }
    //A는 상반기
    if (filter === "A") {
      const res = {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
        dataset1: dataset1.slice(0, 6), //업체수
        dataset2: dataset2.slice(0, 6), //파견인원
        dataset3: dataset3.slice(0, 6), //채용대행인원
        dataset4: dataset4.slice(0, 6), //수수료
        dataset5: dataset5.slice(0, 6), //수익
      };

      return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
    }
    //B는 하반기
    if (filter === "B") {
      const res = {
        labels: ["7월", "8월", "9월", "10월", "11월", "12월"],
        dataset1: dataset1.slice(6), //업체수
        dataset2: dataset2.slice(6), //파견인원
        dataset3: dataset3.slice(6), //채용대행인원
        dataset4: dataset4.slice(6), //수수료
        dataset5: dataset5.slice(6), //수익
      };

      return JsonResponse(res, NETWORK_ERROR_CODE.SUCCESS, "SUCCESS");
    }

    const res = {
      labels: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      dataset1: dataset1, //업체수
      dataset2: dataset2, //파견인원
      dataset3: dataset3, //채용대행인원
      dataset4: dataset4, //수수료
      dataset5: dataset5, //수익
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
      const worksheetOne = workbook.Sheets[sheetNameOne];
      await this.createExcelData(worksheetOne, "A");
    }

    if (sheetNameTwo) {
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
        description,
      ] = row;

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
        description,
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
          "DONE",
          entry.description || ""
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
        description,
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
        description,
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
          type,
          entry.description || ""
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
