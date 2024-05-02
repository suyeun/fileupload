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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "int",
        comment: "사용자 아이디",
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "NAME",
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "사용자 이름",
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "EMAIL",
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "이메일",
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "PLATFORM",
        type: "varchar",
        length: 100,
        nullable: true,
        default: "aos",
        comment: "",
    }),
    __metadata("design:type", String)
], User.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "ROLE",
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "",
        default: "user",
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PHONE", default: null, comment: "핸드폰 번호" }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "TOKEN", default: null }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "REG_DT", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], User.prototype, "regDt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATE_DT",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "updateDt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DELETED", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "TB_FUN_USER" })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map