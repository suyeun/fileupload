"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 85:
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointRepository = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const typeorm_2 = __webpack_require__(39);
const entities_1 = __webpack_require__(37);
const dt_service_1 = __webpack_require__(86);
let PointRepository = exports.PointRepository = class PointRepository {
    constructor(userRepository, mainRepository, workRepository, pointRepository, dataSource, dtService) {
        this.userRepository = userRepository;
        this.mainRepository = mainRepository;
        this.workRepository = workRepository;
        this.pointRepository = pointRepository;
        this.dataSource = dataSource;
        this.dtService = dtService;
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getToDay = this.dtService.getToDay();
            const result = yield this.pointRepository.find({ where: { userId } });
            return result;
        });
    }
    //accId, point, reason
    save(userId, amount, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const getToDay = this.dtService.getToDay();
            console.log("!!!", amount, reason, getToDay);
            const findPoint = yield this.pointRepository.find({
                where: { userId, pointDt: getToDay },
            });
            if (findPoint.length > 1) {
                return undefined;
            }
            else {
                const { raw } = yield this.dataSource.getRepository(Point).insert({
                    userId: userId,
                    amount: amount,
                    reason: reason,
                    pointDt: getToDay,
                });
                return raw[0].ID || undefined;
            }
            return undefined;
        });
    }
    //pointCheck
    pointCheck(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getToDay = this.dtService.getToDay();
            const findPoint = yield this.pointRepository.find({
                where: { userId, pointDt: getToDay },
            });
            if (findPoint.length > 1) {
                return false;
            }
            else {
                return true;
            }
            return false;
        });
    }
};
exports.PointRepository = PointRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Main)),
    __param(2, (0, typeorm_1.InjectRepository)(Work)),
    __param(3, (0, typeorm_1.InjectRepository)(Point)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _e : Object, typeof (_f = typeof dt_service_1.DtService !== "undefined" && dt_service_1.DtService) === "function" ? _f : Object])
], PointRepository);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7ec0e0bcaa9668761c69")
/******/ })();
/******/ 
/******/ }
;