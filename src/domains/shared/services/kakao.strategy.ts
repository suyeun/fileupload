import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor() {
    super({
      clientID: "4cb0c86183e5505f9159f44ef17f3b01",
      callbackURL: "http://localhost:3000/api/v1/users/kakaoCallback",
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    console.log("accessToken", refreshToken, profile);
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const kakaoUser = response.data;
      return kakaoUser;
    } catch (error) {
      return error;
    }
  }
}
