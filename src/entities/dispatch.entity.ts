import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "TB_FUN_DISPATCH" })
export class Dispatch {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
    comment: "아이디",
  })
  id!: number;
  //정산 월, 거래처명,인원수,청구금액,수수료,수수료 지급기준,청구기간,입금일자,세금계산서, 발행일,정산 수수료,정산일자
  @Column({ name: "MONTH", type: "varchar", length: 10, comment: "정산월" })
  month!: string;

  @Column({ name: "NAME", type: "varchar", length: 100, comment: "거래처명" })
  name!: string;

  @Column({ name: "PERSONNEL_COUNT", type: "int", comment: "인원수" })
  personnelCount!: number;

  @Column({ name: "AMOUNT", type: "varchar", length: 100, comment: "청구금액" })
  amount!: string;

  @Column({
    name: "COMMISSION",
    type: "varchar",
    length: 100,
    comment: "수수료",
  })
  commission!: string;

  @Column({
    name: "COMMISSION_PAYMENT_STANDARD",
    type: "varchar",
    length: 100,
    comment: "수수료 지급기준",
  })
  commissionPaymentStandard!: string;

  @Column({
    name: "CLAIM_PERIOD",
    type: "varchar",
    length: 100,
    comment: "청구기간",
  })
  claimPeriod!: string;

  @Column({ name: "DEPOSIT_DATE", type: "date", comment: "입금일자" })
  depositDate!: Date;

  @Column({
    name: "TAX_INVOICE",
    type: "varchar",
    length: 100,
    comment: "세금계산서",
  })
  taxInvoice!: string;

  @Column({ name: "ISSUE_DATE", type: "date", comment: "발행일" })
  issueDate!: Date;

  @Column({
    name: "SETTLEMENT_COMMISSION",
    comment: "정산 수수료",
  })
  settlementCommission!: string;

  @Column({ name: "SETTLEMENT_DATE", type: "date" })
  settlementDate!: Date;

  @CreateDateColumn({ name: "REG_DT", default: () => "CURRENT_TIMESTAMP" })
  regDt?: Date;

  @UpdateDateColumn({
    name: "UPDATE_DT",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updateDt?: Date;

  @Column({ name: "DELETED", default: false })
  deleted?: boolean;
}
