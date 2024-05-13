import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as Entities from "../../entities";

import * as Controllers from "./controllers";
import * as Repositories from "./repositories";
import * as Services from "./services";
import * as Modules from "..";

import { TokenAuthGuard } from "../shared/guards/auth.guard";
import { DtService } from "../shared/services/dt.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Entities.User]),
    TypeOrmModule.forFeature([Entities.ExcelData]),
    TypeOrmModule.forFeature([Entities.Dispatch]),
    forwardRef(() => Modules.SharedModule),
  ],
  controllers: [...Object.values(Controllers)],
  exports: [
    TypeOrmModule,
    ...Object.values(Services),
    ...Object.values(Repositories),
  ],
  providers: [
    ...Object.values(Services),
    ...Object.values(Repositories),
    DtService,
  ],
})
export class ExcelModule {}
