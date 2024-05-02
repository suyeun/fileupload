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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../user/repositories/user.repository");
const core_1 = require("@nestjs/core");
const utils_1 = require("../../../utils");
const logger = new common_1.Logger("TokenAuthGuard");
let TokenAuthGuard = class TokenAuthGuard {
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers.accesstoken || request.headers["accessToken"];
            return true;
            try {
                logger.debug(`TokenAuthGuard parse : ${request.url} / ${(0, utils_1.objectToJson)(request.originalUrl)}`);
                // if (request.url === '/sample/login') return true;
                // else return false;
                if (authorization) {
                    request.headers["accId"] = "1";
                    return true;
                    //const user = await this.userRepository.checkToken(authorization);
                    //if (user) {
                    //  request.headers["adminId"] = user.id.toString();
                    //  return true;
                    //}
                }
                const accessToken = request.body.accessToken;
                if (accessToken) {
                    const user = yield this.userRepository.checkToken(accessToken);
                    logger.debug("userToken:", user, accessToken);
                    if (!user) {
                        return false;
                    }
                    //request.headers["accId"] = user.id.toString();
                    return true;
                }
                return false;
            }
            catch (e) {
                logger.error("redis error", e);
                throw e;
            }
        });
    }
};
TokenAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_repository_1.UserRepository])
], TokenAuthGuard);
exports.TokenAuthGuard = TokenAuthGuard;
//# sourceMappingURL=auth.guard.js.map