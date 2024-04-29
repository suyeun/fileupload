"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 95:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelService = void 0;
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(25);
const repositories_1 = __webpack_require__(96);
const interfaces_1 = __webpack_require__(51);
let ExcelService = exports.ExcelService = class ExcelService {
    constructor(excelRepository) {
        this.excelRepository = excelRepository;
    }
    list(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("body", body);
            const result = yield this.pointRepository.findAll(userId);
            if (!result)
                return (0, interfaces_1.JsonResponse)([], constants_1.ERROR_CODE.QUERY_EXEC_ERROR, "QUERY_EXEC_ERROR");
            let amount = 0;
            result.map((item) => {
                var _a;
                amount += (_a = item === null || item === void 0 ? void 0 : item.amount) !== null && _a !== void 0 ? _a : 0;
                +amount;
            });
            const res = {
                total: amount,
                list: result,
            };
            return (0, interfaces_1.JsonResponse)(res, 200, "OK");
        });
    }
    //포인트 적립, 하루에 한번만 가능하다
    earn(body, userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const point = (_a = body.command) === null || _a === void 0 ? void 0 : _a.amount;
            const reason = ((_b = body.command) === null || _b === void 0 ? void 0 : _b.reason) || "Promotion";
            const accId = userId || 1;
            if (!point)
                return (0, interfaces_1.JsonResponse)([], constants_1.ERROR_CODE.INVALID_INPUT, "INVALID_INPUT");
            const pointCheck = yield this.pointRepository.pointCheck(accId);
            if (!pointCheck)
                return (0, interfaces_1.JsonResponse)([], constants_1.ERROR_CODE.ALREADY_PAID, "ALREADY_PAID");
            const res = yield this.pointRepository.save(accId, point, reason);
            if (!res)
                return (0, interfaces_1.JsonResponse)([], constants_1.ERROR_CODE.ALREADY_PAID, "ALREADY_PAID");
            return (0, interfaces_1.JsonResponse)({}, 200, "OK");
        });
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
            const res = yield this.pointRepository.pointCheck(accId);
            if (!res)
                return (0, interfaces_1.JsonResponse)([], constants_1.ERROR_CODE.ALREADY_PAID, "ALREADY_PAID");
            return (0, interfaces_1.JsonResponse)({ point }, 200, "OK");
        });
    }
};
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.ExcelRepository !== "undefined" && repositories_1.ExcelRepository) === "function" ? _a : Object])
], ExcelService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8bfa119edff9d51066f6")
/******/ })();
/******/ 
/******/ }
;