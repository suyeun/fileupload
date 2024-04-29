import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as Entities from "../../entities";
//import { Work } from '../work/work.entity';

import * as Controllers from "./controllers";
import * as Repositories from "./repositories";
import * as Services from "./services";
import * as Modules from "..";

import { PassportModule } from "@nestjs/passport";
import { OAuth2Client } from "google-auth-library";

import { OAuthService } from "../shared/services/oauth2.service";
import { JwtService } from "../shared/services/jwt.service";
import { KakaoStrategy } from "../shared/services/kakao.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Entities.User]),
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
    OAuth2Client,
    OAuthService,
    JwtService,
    KakaoStrategy,
  ],
})
export class UserModule {}
