import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User, ExcelData } from "../../../entities";
import { DtService } from "../../shared/services/dt.service";

@Injectable()
export class ExcelRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ExcelData)
    private readonly excelDataRepository: Repository<ExcelData>,

    private readonly dataSource: DataSource,

    private readonly dtService: DtService
  ) {}

  async save(
    userId: number,
    date: string,
    message: string
  ): Promise<any[] | undefined> {
    //const getToDay = date || this.dtService.getToDay();
    const getToDay = date;

    const memo = {
      userId,
      writeDt: getToDay,
      message,
    };

    const findAll = await this.excelDataRepository.find();
    return findAll;
  }

  async createExcelData(
    month: string,
    companyCnt: number,
    userCnt: number,
    amount: number,
    charge: number,
    deposit: Date,
    settlement: number,
    amountDay: Date
  ): Promise<any> {
    const result = await this.excelDataRepository.insert({
      month,
      companyCnt,
      userCnt,
      amount,
      charge,
      deposit,
      settlement,
      amountDay,
    });
    return result;
  }
}
