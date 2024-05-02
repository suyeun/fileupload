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
exports.ExcelData = void 0;
const typeorm_1 = require("typeorm");
let ExcelData = class ExcelData {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "int",
        comment: "아이디",
    }),
    __metadata("design:type", Number)
], ExcelData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "MONTH",
        comment: "정산월",
    }),
    __metadata("design:type", String)
], ExcelData.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "COMPANY_CNT",
        comment: "업체수",
    }),
    __metadata("design:type", Number)
], ExcelData.prototype, "companyCnt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "USER_CNT",
        comment: "인원수",
    }),
    __metadata("design:type", Number)
], ExcelData.prototype, "userCnt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "AMOUNT",
        comment: "청구금액",
    }),
    __metadata("design:type", Number)
], ExcelData.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "CHARGE",
        comment: "수수료",
    }),
    __metadata("design:type", Number)
], ExcelData.prototype, "charge", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "DEPOSIT",
        comment: "입금일자",
    }),
    __metadata("design:type", Date)
], ExcelData.prototype, "deposit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "SETTLEMENT",
        comment: "정산수수료 금액",
    }),
    __metadata("design:type", Number)
], ExcelData.prototype, "settlement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "STATUS",
        comment: "정산 상태",
    }),
    __metadata("design:type", String)
], ExcelData.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "KINDS", comment: "종류" }),
    __metadata("design:type", String)
], ExcelData.prototype, "kinds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "AMOUNT_DAY",
        comment: "정산 수수료 정산일자",
    }),
    __metadata("design:type", Date)
], ExcelData.prototype, "amountDay", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "REG_DT", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ExcelData.prototype, "regDt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATE_DT",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ExcelData.prototype, "updateDt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DELETED", default: false }),
    __metadata("design:type", Boolean)
], ExcelData.prototype, "deleted", void 0);
ExcelData = __decorate([
    (0, typeorm_1.Entity)({ name: "TB_FUN_DATA" })
], ExcelData);
exports.ExcelData = ExcelData;
//# sourceMappingURL=excel.entity.js.map