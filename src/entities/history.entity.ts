import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "TB_FUN_HISTORY" })
export class History {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
    comment: "아이디",
  })
  id!: number;

  @Column({
    name: "NAME",
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "제목",
  })
  title?: string;

  @Column({
    name: "FILE",
    type: "varchar",
    length: 1000,
    nullable: true,
    comment: "",
  })
  file?: string;

  @Column({ name: "DESCRIPTION", default: null })
  description?: string;

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
