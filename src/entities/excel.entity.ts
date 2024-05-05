import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "TB_FUN_DATA" })
export class ExcelData {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
    comment: "아이디",
  })
  id!: number;

  @Column({
    name: "MONTH",
    comment: "정산월",
  })
  month?: string;

  @Column({
    name: "COMPANY_CNT",
    comment: "업체수",
  })
  companyCnt?: number;

  @Column({
    name: "USER_CNT",
    comment: "인원수",
  })
  userCnt?: number;

  @Column({
    name: "AMOUNT",
    comment: "청구금액",
  })
  amount?: string;

  @Column({
    name: "CHARGE",
    comment: "수수료",
  })
  charge?: string;

  @Column({
    name: "DEPOSIT",
    comment: "입금일자",
  })
  deposit?: Date;

  @Column({
    name: "SETTLEMENT",
    comment: "정산수수료 금액",
  })
  settlement?: string;

  @Column({
    name: "STATUS",
    comment: "정산 상태",
  })
  status?: string;

  @Column({ name: "KINDS", comment: "종류" })
  kinds?: string;

  @Column({
    name: "AMOUNT_DAY",
    comment: "정산 수수료 정산일자",
  })
  amountDay?: Date;

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
