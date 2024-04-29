"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 93:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointController = void 0;
const common_1 = __webpack_require__(4);
const services_1 = __webpack_require__(94);
const auth_guard_1 = __webpack_require__(100);
const platform_express_1 = __webpack_require__(6);
const XLSX = __importStar(__webpack_require__(101));
let PointController = exports.PointController = class PointController {
    constructor(excelService) {
        this.excelService = excelService;
    }
    list(body, req) {
        const accId = req.headers.accId;
        return this.excelService.random(accId);
    }
    handleExcel(file) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("file!!!!!", file);
            const workbook = XLSX.read(file.buffer, { type: "buffer" });
            // 첫번째 sheet 의 이름을 조회합니다.
            const sheetName = workbook.SheetNames[0];
            if (!sheetName)
                return;
            // 첫번째 sheet 를 사용합니다.
            const sheet = workbook.Sheets[sheetName];
            if (!sheet)
                return;
            // sheet 의 정보를 json array 로 변환합니다.
            const rows = XLSX.utils.sheet_to_json(sheet, {
                // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
                defval: null,
            });
            const data = rows.slice(1); // Extract rows 3 to the last row
            const jsonData = data.map((row) => {
                const values = Object.keys(row).map((key) => row[key]);
                console.log("row", values.length);
                if (values.length < 8)
                    return;
                const [month, companyCnt, userCnt, amount, charge, deposit, settlement, amountDay,] = values;
                new Date(Date.parse(deposit)).toISOString().slice(0, 10);
                console.log("deposit", deposit);
                //const dateValue = XLSX.utils.format_cell(dateCell);
                //const date = XLSX.SSF.parse_date_code(dateValue);
                return {
                    month,
                    companyCnt,
                    userCnt,
                    amount,
                    charge,
                    deposit,
                    settlement,
                    amountDay,
                };
            });
            console.log("jsonData", jsonData);
            for (const row of rows) {
                const values = Object.keys(row).map((key) => row[key]);
                // console.log("sheetName!!!!!", values);
                const [name, age, phone] = values;
            }
            return true;
        });
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("me"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PointController.prototype, "list", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "handleExcel", null);
exports.PointController = PointController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.Controller)("api/v1/file"),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.ExcelService !== "undefined" && services_1.ExcelService) === "function" ? _a : Object])
], PointController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("35b63d33855895f0e5a6")
/******/ })();
/******/ 
/******/ }
;