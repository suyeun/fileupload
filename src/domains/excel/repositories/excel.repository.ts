import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User, ExcelData, Dispatch } from "../../../entities";
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
  //month. name, personnelCount,amount,
  //commission, commissionPaymentStandard, claimPeriod, depositDate, taxInvoice,
  // issueDate, settlementCommission,settlementDate

  async dispatchCreateExcelData(
    month: string,
    name: string,
    personnelCount: number,
    amount: string,
    commission: string,
    commissionPaymentStandard: string,
    claimPeriod: string,
    depositDate: Date,
    taxInvoice: string,
    issueDate: Date,
    settlementCommission: string,
    settlementDate: Date
  ): Promise<any> {
    const existingData = await this.dispatchRepository.findOne({
      where: {
        month,
        name,
      },
    });

    if (existingData) {
      existingData.month = month;
      existingData.name = name;
      existingData.personnelCount = personnelCount;
      existingData.amount = amount;
      existingData.commission = commission;
      existingData.commissionPaymentStandard = commissionPaymentStandard;
      existingData.claimPeriod = claimPeriod;
      existingData.depositDate = depositDate;
      existingData.taxInvoice = taxInvoice;
      existingData.issueDate = issueDate;
      existingData.settlementCommission = settlementCommission;
      existingData.settlementDate = settlementDate;

      const result = await this.dispatchRepository.save(existingData);

      return result;
    } else {
      const newData = await this.dispatchRepository.save({
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
      });
      console.log("newData", newData);
      return newData;
    }
  }

  async dispatchLoad(): Promise<any> {
    const res = await this.dispatchRepository.find();

    return res;
  }
}
