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
    amount: string,
    charge: string,
    deposit: Date,
    settlement: string,
    amountDay: Date,
    kinds: string,
    status: string
  ): Promise<any> {
    const existingData = await this.excelDataRepository.findOne({
      where: {
        month,
        companyCnt,
        userCnt,
      },
    });

    if (existingData) {
      existingData.amount = amount;
      existingData.charge = charge;
      existingData.deposit = deposit;
      existingData.settlement = settlement;
      existingData.amountDay = amountDay;
      existingData.kinds = kinds;
      existingData.status = status;

      const result = await this.excelDataRepository.save(existingData);

      return result;
    } else {
      const newData = await this.excelDataRepository.save({
        month,
        companyCnt,
        userCnt,
        amount,
        charge,
        deposit,
        settlement,
        amountDay,
        kinds,
        status,
      });
      console.log("newData", newData);
      return newData;
    }
  }

  async load(): Promise<any> {
    const res = await this.excelDataRepository.find({
      where: {
        kinds: "first",
        status: "DONE",
      },
    });

    return res;
  }
}
