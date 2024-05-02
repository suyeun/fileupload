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
    const workbook = XLSX.read(file.buffer, {
      type: "buffer",
      cellDates: true,
      dateNF: "yyyy-mm-dd",
    });

    // 첫번째 sheet 의 이름을 조회합니다.
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) return;
    // 첫번째 sheet 를 사용합니다.
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return;

    // sheet 의 정보를 json array 로 변환합니다.
    const rows = XLSX.utils.sheet_to_json(sheet, {
      // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
      defval: null,
    });
    const data = rows.slice(1); // Extract rows 3 to the last row
    const jsonData = (data as Record<string, any>[]).map(
      (row: Record<string, any>) => {
        const values = Object.keys(row).map((key: string) => row[key]);

        console.log("deposit", values[7]);
        if (values.length < 8) return;
        const [
          month,
          companyCnt,
          userCnt,
          amount,
          charge,
          deposit,
          settlement,
          amountDay,
        ] = values;

        //const dateValue = XLSX.utils.format_cell(dateCell);
        //const date = XLSX.SSF.parse_date_code(dateValue);
        return {
          month,
          companyCnt,
          userCnt,
          amount,
          charge,
          deposit,
          settlement,
          amountDay,
        };
      }
    );
    console.log("jsonData", jsonData);
    for (const row of rows as Record<string, any>[]) {
      const values = Object.keys(row).map((key: string) => row[key]);
      // console.log("sheetName!!!!!", values);
      const [name, age, phone] = values;
    }
    return true;
  }
}
