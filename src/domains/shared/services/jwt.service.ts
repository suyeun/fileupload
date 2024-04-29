import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import * as crypto from "crypto";

@Injectable()
export class JwtService {
  private readonly jwtService: NestJwtService;
  private readonly expiresIn: number; // 만료 시간(초) 설정
  private readonly SECRET: string;

  constructor() {
    this.jwtService = new NestJwtService({
      secret: "workpick12#$", // JWT 시크릿 키로 대체해야 합니다.
    });
    this.SECRET = "workpick12#$";
    this.expiresIn = 7 * 24 * 60 * 60;
  }

  generateToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.expiresIn,
    });
  }

  getAccessToken(payload: any): string {
    console.log("userId!!!", payload);
    const plainText: string = new Date().toString();
    const hashed: string = crypto
      .createHash("sha256")
      .update(plainText)
      .digest("hex");

    //const hashed: string = CryptoUtil.createHash('sha256', 'this.SECRET').update(plainText).digest('hex');
    return hashed;
  }
}
