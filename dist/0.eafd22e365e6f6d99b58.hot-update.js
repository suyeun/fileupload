"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 48:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(25);
const repositories_1 = __webpack_require__(49);
const interfaces_1 = __webpack_require__(51);
const oauth2_service_1 = __webpack_require__(67);
const jwt_service_1 = __webpack_require__(71);
let UserService = exports.UserService = class UserService {
    constructor(userRepository, oAuthService, jwtService) {
        this.userRepository = userRepository;
        this.oAuthService = oAuthService;
        this.jwtService = jwtService;
    }
    handleSocialLogin(provider, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let channelId = "";
            let name = "";
            let email = "";
            if (provider === "kakao") {
                console.log("kakao payload", payload.data);
                channelId = payload.data.id;
                name = "";
                email = payload.data.kakao_account.email;
            }
            else {
                channelId = payload.sub;
                name = payload.given_name;
                email = payload.email;
            }
            const user = yield this.userRepository.findChannelId(channelId);
            if (user.length === 0) {
                const createdUser = yield this.userRepository.create(channelId, name, email);
                return createdUser;
            }
            return user;
        });
    }
    //소셜 로그인
    social(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider, idToken, deviceId, name } = body.command;
            let payload = null;
            if (provider === "kakao") {
                payload = yield this.oAuthService.verifyIdTokenKakao(idToken, provider);
            }
            else {
                payload = yield this.oAuthService.verifyIdToken(idToken, provider);
            }
            if (!payload) {
                return (0, interfaces_1.JsonResponse)({}, constants_1.ERROR_CODE.PAYLOAD_NOT_FOUND, "PAYLOAD NOT FOUND");
            }
            const userObject = yield this.handleSocialLogin(provider, payload);
            if (!userObject) {
                return (0, interfaces_1.JsonResponse)({}, constants_1.ERROR_CODE.USER_NOT_FOUND_ERROR, "USER_NOT_FOUND_ERROR");
            }
            const userObjects = userObject[0];
            userObjects.isWork = false;
            const userWork = yield this.userRepository.findInProgressWorks(userObjects.id);
            if (userWork.length > 0) {
                userObjects.isWork = true;
            }
            const accessToken = yield this.jwtService.getAccessToken(userObjects.id);
            //console.log('accessToken', accessToken);
            if (accessToken) {
                userObjects.accessToken = accessToken;
            }
            const tokenUpdate = yield this.userRepository.update(userObjects.id, accessToken);
            //certificationKey
            userObjects.certificationKey = userObjects.certificationKey ? true : false;
            userObjects.platform = "aos";
            userObjects.role = "user";
            userObjects.provider = "google";
            return (0, interfaces_1.JsonResponse)(userObjects, 200, "OK");
        });
    }
    certifications(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { impUid } = body.command;
                const payload = yield this.oAuthService.certifications(impUid);
                const accId = userId || 4;
                if (!payload) {
                    return (0, interfaces_1.JsonResponse)({}, constants_1.ERROR_CODE.PAYLOAD_NOT_FOUND, "PAYLOAD NOT FOUND");
                }
                const { birthday, phone } = payload;
                const updateData = {
                    birthday,
                    phone,
                    certificationKey: impUid,
                };
                return (0, interfaces_1.JsonResponse)(keyUpdate, 200, "OK");
            }
            catch (err) {
                return (0, interfaces_1.JsonResponse)({}, constants_1.ERROR_CODE.SERVER_MAINTENANCE, "SERVER_MAINTENANCE");
            }
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.UserRepository !== "undefined" && repositories_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof oauth2_service_1.OAuthService !== "undefined" && oauth2_service_1.OAuthService) === "function" ? _b : Object, typeof (_c = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _c : Object])
], UserService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ebf8ca2f50f43e86540d")
/******/ })();
/******/ 
/******/ }
;