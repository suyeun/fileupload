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
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const repositories_1 = require("../repositories");
const interfaces_1 = require("../../shared/interfaces");
let ExcelService = class ExcelService {
    constructor(excelRepository) {
        this.excelRepository = excelRepository;
    }
    random(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const accId = userId || 1;
            const result = [
                10, 12, 13, 14, 15, 11, 16, 10, 17, 18, 11, 19, 10, 11, 20, 21, 10, 22,
                11, 23, 24, 11, 25, 26,
            ];
            const randomValue = result[Math.floor(Math.random() * result.length)];
            const point = randomValue;
            if (!point)
                return (0, interfaces_1.JsonResponse)([], constants_1.ERROR_CODE.INVALID_INPUT, "INVALID_INPUT");
            return (0, interfaces_1.JsonResponse)({ point }, 200, "OK");
        });
    }
};
ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.ExcelRepository])
], ExcelService);
exports.ExcelService = ExcelService;
//# sourceMappingURL=excel.service.js.map