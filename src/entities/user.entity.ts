import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "TB_FUN_USER" })
export class User {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
    comment: "사용자 아이디",
  })
  id!: number;

  @Column({
    name: "NAME",
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "사용자 이름",
  })
  name?: string;

  @Column({
    name: "EMAIL",
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "이메일",
  })
  email!: string;

  @Column({
    name: "PLATFORM",
    type: "varchar",
    length: 100,
    nullable: true,
    default: "aos",
    comment: "",
  })
  platform?: string;

  @Column({
    name: "ROLE",
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "",
    default: "user",
  })
  role?: string;

  @Column({ name: "PHONE", default: null, comment: "핸드폰 번호" })
  phone?: number;

  @Column({ name: "TOKEN", default: null })
  accessToken?: string;

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
