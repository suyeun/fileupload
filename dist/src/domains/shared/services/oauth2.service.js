"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const verify_apple_id_token_1 = __importDefault(require("verify-apple-id-token"));
const axios_1 = __importDefault(require("axios"));
//refactoring 필요 2023.10.02
let OAuthService = class OAuthService {
    constructor(client) {
        this.client = client;
    }
    verifyIdToken(token, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const CLIENT_ID = "676232833118-cf0gqqvjbe619ed1653lffmhfqhc5ls3.apps.googleusercontent.com";
            const IOS_CID = "921664553853-tmuuu1ul3cgdqjtb3c6892mopldau2kp.apps.googleusercontent.com";
            const ANDROID_CID = "921664553853-8q4l002ofn1pulbfs8ecvbc1918brths.apps.googleusercontent.com";
            const CLIENT_ID_APP = "com.workpick.orw";
            const AUDIENCE = [CLIENT_ID, IOS_CID, ANDROID_CID];
            try {
                if (provider === "kakao") {
                    const response = yield axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response.data;
                }
                else if (provider === "apple") {
                    const APPLE_CLIENT_ID_APP = "com.workpick.go-to-work";
                    const response = yield (0, verify_apple_id_token_1.default)({
                        idToken: token,
                        clientId: [APPLE_CLIENT_ID_APP],
                    });
                    return response;
                }
                // ID 토큰 검증 및 유효성 확인 1
                const ticket = yield this.client.verifyIdToken({
                    idToken: token,
                    audience: AUDIENCE, // 클라이언트 ID 입력
                });
                // 검증된 토큰의 payload 반환
                return ticket.getPayload();
            }
            catch (error) {
                console.log("error", error);
                // 검증 실패 시 예외 처리
                return null;
                throw new Error("Invalid ID token");
            }
        });
    }
    verifyIdTokenKakao(token, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("provider", provider);
                const response = yield axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // 검증된 토큰의 payload 반환
                return response;
            }
            catch (error) {
                console.log("error", error);
                throw new Error("Invalid ID token");
            }
        });
    }
    //imp_uid로 결제 정보 조회
    certifications(impUid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 인증 토큰 발급 받기
                const getToken = yield (0, axios_1.default)({
                    url: "https://api.iamport.kr/users/getToken",
                    // POST method
                    method: "post",
                    // "Content-Type": "application/json"
                    headers: { "Content-Type": "application/json" },
                    data: {
                        imp_key: "8567101728422754",
                        imp_secret: "O0pT42HLwq07qv2xAB4xVqFAzSpLzE3QQBSyynUNDcUNWYOSd85HawULlDwYwJAyhXmZczg6s0Nc4yX6", // REST API Secret
                    },
                });
                // imp_uid로 포트원 서버에서 결제 정보 조회
                const accessToken = getToken.data.response.access_token;
                // Step 2: Get Certification Information
                const response = yield axios_1.default.get(`https://api.iamport.kr/certifications/${impUid}`, {
                    headers: { Authorization: accessToken },
                });
                const responseData = response.data.response;
                return responseData;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
OAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_auth_library_1.OAuth2Client])
], OAuthService);
exports.OAuthService = OAuthService;
//# sourceMappingURL=oauth2.service.js.map