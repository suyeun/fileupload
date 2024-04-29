import { Injectable, Request, Response, Body } from "@nestjs/common";
import { ERROR_CODE, NETWORK_ERROR_CODE } from "../../../constants";
import { UserRepository } from "../repositories";
import { JsonResponse } from "../../shared/interfaces";
import { UserData } from "../interfaces";
import { nanoid } from "nanoid";
import * as USER_DTO from "../dto";

import { OAuthService } from "../../shared/services/oauth2.service";
import { JwtService } from "../../shared/services/jwt.service";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly oAuthService: OAuthService,
    private readonly jwtService: JwtService
  ) {}

  async handleSocialLogin(provider: string, payload: any): Promise<any> {
    let channelId = "";
    let name = "";
    let email = "";

    if (provider === "kakao") {
      console.log("kakao payload", payload.data);
      channelId = payload.data.id;
      name = "";
      email = payload.data.kakao_account.email;
    } else {
      channelId = payload.sub;
      name = payload.given_name;
      email = payload.email;
    }

    return email;
  }

  //소셜 로그인
  async social(body: USER_DTO.UserSocialDTO) {
    const { provider, idToken, deviceId, name } = body.command;
    let payload = null;
    if (provider === "kakao") {
      payload = await this.oAuthService.verifyIdTokenKakao(idToken, provider);
    } else {
      payload = await this.oAuthService.verifyIdToken(idToken, provider);
    }

    if (!payload) {
      return JsonResponse(
        {},
        ERROR_CODE.PAYLOAD_NOT_FOUND,
        "PAYLOAD NOT FOUND"
      );
    }
    const userObject = await this.handleSocialLogin(provider, payload);

    if (!userObject) {
      return JsonResponse(
        {},
        ERROR_CODE.USER_NOT_FOUND_ERROR,
        "USER_NOT_FOUND_ERROR"
      );
    }
    const userObjects: any = userObject[0];
    userObjects.isWork = false;

    const accessToken = await this.jwtService.getAccessToken(userObjects.id);
    //console.log('accessToken', accessToken);
    if (accessToken) {
      userObjects.accessToken = accessToken;
    }

    const tokenUpdate = await this.userRepository.update(
      userObjects.id,
      accessToken
    );
    //certificationKey
    userObjects.certificationKey = userObjects.certificationKey ? true : false;
    userObjects.platform = "aos";
    userObjects.role = "user";
    userObjects.provider = "google";

    return JsonResponse(userObjects, 200, "OK");
  }
}
