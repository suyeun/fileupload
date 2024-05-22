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
  Query,
  Get,
} from "@nestjs/common";

import * as POINT_DTO from "../dto";
import { ExcelService } from "../services";

import { TokenAuthGuard } from "../../shared/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { JsonResponse } from "../../shared/interfaces";

@UseGuards(TokenAuthGuard)
@Controller("api/v1/data")
export class PointController {
  constructor(private readonly excelService: ExcelService) {}

  @Get("list")
  async findAll(@Query("filter") filter: string) {
    return this.excelService.findAll(filter);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async handleExcel(@UploadedFile() file: any) {
    //console.log(file);
    return this.excelService.upload(file);
  }

  @Get("load")
  async load() {
    return this.excelService.load();
  }

  @Get("load/one")
  async loadOne() {
    return this.excelService.loadDispatch("A");
  }

  @Get("load/two")
  async loadTwo() {
    return this.excelService.loadDispatch("B");
  }
}
