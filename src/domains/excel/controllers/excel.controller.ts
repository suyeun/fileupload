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
  Get,
} from "@nestjs/common";

import * as POINT_DTO from "../dto";
import { ExcelService } from "../services";

import { TokenAuthGuard } from "../../shared/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { JsonResponse } from "../../shared/interfaces";

@UseGuards(TokenAuthGuard)
@Controller("api/v1/first")
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
    //console.log(file);
    return this.excelService.random(file);
  }

  @Get("load")
  async load() {
    return this.excelService.load();
  }
}
