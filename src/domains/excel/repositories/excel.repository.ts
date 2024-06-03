import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User, ExcelData, Dispatch, History } from "../../../entities";
import { DtService } from "../../shared/services/dt.service";

@Injectable()
export class ExcelRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ExcelData)
    private readonly excelDataRepository: Repository<ExcelData>,

    @InjectRepository(Dispatch)
    private readonly dispatchRepository: Repository<Dispatch>,

    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,

    private readonly dataSource: DataSource,

    private readonly dtService: DtService
  ) {}

  async getHistory(): Promise<any> {
    const res = await this.historyRepository.find();
    return res;
  }

  async imgUploadFromFileDto(
    name: string,
    description: string,
    filePath: any
  ): Promise<any> {
    console.log("!!!!????", name);
    const res = await this.historyRepository.save({
      title: name,
      description: description,
      file: filePath,
    });
    return res;
  }

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
    status: string,
    description: string
  ): Promise<any> {
    const existingData = await this.excelDataRepository.delete({
      kinds: kinds,
    });

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
      description,
    });

    return newData;
  }

  async createExcelDispatchData(
    month: string,
    name: string,
    personnelCount: number,
    amount: string,
    commission: string,
    commissionPaymentStandard: string,
    claimPeriod: string,
    depositDate: Date,
    issueDate: Date,
    settlementCommission: string,
    settlementDate: Date,
    type: string,
    description: string
  ): Promise<any> {
    const existingData = await this.dispatchRepository.delete({ type: type });

    const newData = await this.dispatchRepository.save({
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
      type,
      description,
    });

    return newData;
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

  async dispatchCreateExcelData(
    month: string,
    name: string,
    personnelCount: number,
    amount: string,
    commission: string,
    commissionPaymentStandard: string,
    claimPeriod: string,
    depositDate: Date,
    type: string,
    issueDate: Date,
    settlementCommission: string,
    settlementDate: Date,
    description: string
  ): Promise<any> {
    const existingData = await this.dispatchRepository.delete({ type: type });

    const newData = await this.dispatchRepository.save({
      month,
      name,
      personnelCount,
      amount,
      commission,
      commissionPaymentStandard,
      claimPeriod,
      depositDate,
      type,
      issueDate,
      settlementCommission,
      settlementDate,
      description,
    });
    console.log("newData", newData);
    return newData;
  }

  async dispatchLoad(type: string): Promise<any> {
    const res = await this.dispatchRepository.find({
      where: {
        type: type,
      },
    });

    return res;
  }

  async findAll(): Promise<any> {
    const res = await this.excelDataRepository.find();
    const res2 = await this.dispatchRepository.find({ where: { type: "A" } });
    const res3 = await this.dispatchRepository.find({ where: { type: "B" } });

    return { res: res, res2: res2, res3: res3 };
  }
}
