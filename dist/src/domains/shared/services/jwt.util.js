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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtUtil = class JwtUtil {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    generateToken(userId) {
        return this.jwtService.sign({ userId });
    }
    extractTokenFromRequest(request) {
        const authorizationHeader = request.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.replace('Bearer ', '');
        return token || null;
    }
    validateToken(token) {
        try {
            this.jwtService.verify(token);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
JwtUtil = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtUtil);
exports.JwtUtil = JwtUtil;
//# sourceMappingURL=jwt.util.js.map