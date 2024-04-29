import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../entities";
import { DtService } from "../../shared/services/dt.service";

@Injectable()
export class ExcelRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,

    private readonly dtService: DtService
  ) {}
}
