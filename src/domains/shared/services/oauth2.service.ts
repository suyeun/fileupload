import { Injectable } from "@nestjs/common";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import verifyAppleToken from "verify-apple-id-token";
import axios from "axios";
//refactoring 필요 2023.10.02
@Injectable()
export class OAuthService {
  constructor(private readonly client: OAuth2Client) {}

  async verifyIdToken(token: string, provider: string): Promise<any> {
    const CLIENT_ID =
      "676232833118-cf0gqqvjbe619ed1653lffmhfqhc5ls3.apps.googleusercontent.com";
    const IOS_CID =
      "921664553853-tmuuu1ul3cgdqjtb3c6892mopldau2kp.apps.googleusercontent.com";
    const ANDROID_CID =
      "921664553853-8q4l002ofn1pulbfs8ecvbc1918brths.apps.googleusercontent.com";

    const CLIENT_ID_APP: string = "com.workpick.orw";
    const AUDIENCE: string[] = [CLIENT_ID, IOS_CID, ANDROID_CID];

    try {
      if (provider === "kakao") {
        const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } else if (provider === "apple") {
        const APPLE_CLIENT_ID_APP = "com.workpick.go-to-work";
        const response = await verifyAppleToken({
          idToken: token,
          clientId: [APPLE_CLIENT_ID_APP],
        });

        return response;
      }

      // ID 토큰 검증 및 유효성 확인 1
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: AUDIENCE, // 클라이언트 ID 입력
      });

      // 검증된 토큰의 payload 반환
      return ticket.getPayload();
    } catch (error) {
      console.log("error", error);
      // 검증 실패 시 예외 처리
      return null;
      throw new Error("Invalid ID token");
    }
  }

  async verifyIdTokenKakao(token: string, provider: string): Promise<any> {
    try {
      console.log("provider", provider);
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 검증된 토큰의 payload 반환
      return response;
    } catch (error) {
      console.log("error", error);
      throw new Error("Invalid ID token");
    }
  }
  //imp_uid로 결제 정보 조회
  async certifications(impUid: string): Promise<any> {
    try {
      // 인증 토큰 발급 받기
      const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        // POST method
        method: "post",
        // "Content-Type": "application/json"
        headers: { "Content-Type": "application/json" },
        data: {
          imp_key: "8567101728422754", // REST API키
          imp_secret:
            "O0pT42HLwq07qv2xAB4xVqFAzSpLzE3QQBSyynUNDcUNWYOSd85HawULlDwYwJAyhXmZczg6s0Nc4yX6", // REST API Secret
        },
      });
      // imp_uid로 포트원 서버에서 결제 정보 조회
      const accessToken = getToken.data.response.access_token;

      // Step 2: Get Certification Information
      const response = await axios.get(
        `https://api.iamport.kr/certifications/${impUid}`,
        {
          headers: { Authorization: accessToken },
        }
      );

      const responseData = response.data.response;

      return responseData;
    } catch (e) {
      console.error(e);
    }
  }
}
