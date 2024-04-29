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
    constructor(pointService) {
        this.pointService = pointService;
    }
    list(body, req) {
        const accId = req.headers.accId;
        return this.pointService.list(body, accId);
    }
    handleExcel(file) {
        return __awaiter(this, void 0, void 0, function* () {
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
            for (const row of rows) {
                const values = Object.keys(row).map((key) => row[key]);
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
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.PointService !== "undefined" && services_1.PointService) === "function" ? _a : Object])
], PointController);


/***/ }),

/***/ 92:
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(93), exports);


/***/ }),

/***/ 91:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const Entities = __importStar(__webpack_require__(37));
const Controllers = __importStar(__webpack_require__(92));
const Repositories = __importStar(__webpack_require__(96));
const Services = __importStar(__webpack_require__(94));
const Modules = __importStar(__webpack_require__(14));
const dt_service_1 = __webpack_require__(98);
let ExcelModule = exports.ExcelModule = class ExcelModule {
};
exports.ExcelModule = ExcelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Entities.User]),
            (0, common_1.forwardRef)(() => Modules.SharedModule),
        ],
        controllers: [...Object.values(Controllers)],
        exports: [
            typeorm_1.TypeOrmModule,
            ...Object.values(Services),
            ...Object.values(Repositories),
        ],
        providers: [
            ...Object.values(Services),
            ...Object.values(Repositories),
            dt_service_1.DtService,
        ],
    })
], ExcelModule);


/***/ }),

/***/ 97:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointRepository = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const typeorm_2 = __webpack_require__(39);
const entities_1 = __webpack_require__(37);
const dt_service_1 = __webpack_require__(98);
let PointRepository = exports.PointRepository = class PointRepository {
    constructor(userRepository, dataSource, dtService) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
        this.dtService = dtService;
    }
};
exports.PointRepository = PointRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object, typeof (_c = typeof dt_service_1.DtService !== "undefined" && dt_service_1.DtService) === "function" ? _c : Object])
], PointRepository);


/***/ }),

/***/ 96:
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(97), exports);
__exportStar(__webpack_require__(50), exports);


/***/ }),

/***/ 94:
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(95), exports);


/***/ }),

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
exports.PointService = void 0;
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(25);
const repositories_1 = __webpack_require__(96);
const interfaces_1 = __webpack_require__(51);
let PointService = exports.PointService = class PointService {
    constructor(pointRepository) {
        this.pointRepository = pointRepository;
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
exports.PointService = PointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.PointRepository !== "undefined" && repositories_1.PointRepository) === "function" ? _a : Object])
], PointService);


/***/ }),

/***/ 14:
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
//@index('./**/*.ts', f => f.path.includes('module') ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(91), exports);


/***/ }),

/***/ 100:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenAuthGuard = void 0;
const common_1 = __webpack_require__(4);
const user_repository_1 = __webpack_require__(50);
const core_1 = __webpack_require__(5);
const utils_1 = __webpack_require__(53);
const logger = new common_1.Logger("TokenAuthGuard");
let TokenAuthGuard = exports.TokenAuthGuard = class TokenAuthGuard {
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers.accesstoken || request.headers["accessToken"];
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
                    request.headers["accId"] = user.id.toString();
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
exports.TokenAuthGuard = TokenAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object])
], TokenAuthGuard);


/***/ }),

/***/ 98:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DtService = void 0;
const common_1 = __webpack_require__(4);
const moment_1 = __importDefault(__webpack_require__(99));
let DtService = exports.DtService = class DtService {
    //  private readonly jwtService: NestJwtService;
    //constructor() {}
    //YYYY-MM
    getDayStr(dateStr) {
        const result = new Date(dateStr).toISOString().split("T")[0];
        return result;
    }
    getTimeStr(timeStr) {
        const result = new Date(timeStr).toISOString().split("T")[1];
        return result;
    }
    //00:00, 00:00 사이시간 구하기
    getIntervalTime(startTime, endTime) {
        const startParts = startTime.split(":").map(Number);
        if (startParts.length !== 2) {
            console.log("Invalid start time format");
            return 0;
        }
        const [startHour, startMinute] = startParts;
        const endParts = endTime.split(":").map(Number);
        if (endParts.length !== 2) {
            console.log("Invalid end time format");
            return 0;
        }
        let [endHour, endMinute] = endParts;
        if (endHour == null ||
            endMinute == null ||
            startHour == null ||
            startMinute == null)
            return 0;
        if (endHour < startHour ||
            (endHour === startHour && endMinute < startMinute)) {
            // endTime이 startTime보다 이전 시간인 경우, endTime에 24시간을 더해줍니다.
            endHour += 24;
        }
        let totalHoursPerDay = endHour + endMinute / 60 - (startHour + startMinute / 60);
        //소수점 버림
        totalHoursPerDay = Math.floor(totalHoursPerDay);
        return Math.abs(totalHoursPerDay);
    }
    //현재 시간 구하기
    currentTime() {
        const date = new Date(+new Date() + 3240 * 10000)
            .toISOString()
            .replace("T", " ")
            .replace(/\..*/, "");
        return date;
    }
    currentTimeFour() {
        const currentDate = new Date(+new Date() + 3240 * 10000); // 현재 시간
        const currentHour = currentDate.getHours(); // 현재 시간의 시간 부분 (0-23)
        const modifiedDate = new Date(currentDate); // 현재 시간을 기준으로 새로운 Date 객체 생성
        modifiedDate.setHours(currentHour - 4); // 4시간 전의 00:00 시간 설정
        const modifiedTime = modifiedDate
            .toISOString()
            .replace("T", " ")
            .replace(/\..*/, "");
        return modifiedTime;
    }
    //현재 날짜 구하기 2023-01-01
    getToDay() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const toDay = year +
            "-" +
            ("00" + month.toString()).slice(-2) +
            "-" +
            ("00" + day.toString()).slice(-2);
        return toDay;
    }
    getYesterday() {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
    getTodayPay(hourlyPay, startCheckTime, currentTime) {
        //hourlyPay: number, startCheckTime: Date, currentTime: string
        //startCheckTime시간을 확인하고 currentTime시간을 확인해서 사이시간에 급여를 곱해서 총 급여를 계산한다.
        //10000 2023-10-07T15:58:21.000Z 2023-10-08 02:05:20
        const startMoment = (0, moment_1.default)(startCheckTime).subtract(9, "hours");
        const currentMoment = (0, moment_1.default)(currentTime);
        // Calculate the difference in hours between the two times
        const hoursWorked = currentMoment.diff(startMoment, "hours");
        // Calculate total pay
        const todayPay = hoursWorked * hourlyPay;
        if (todayPay < 0) {
            return Math.abs(todayPay);
        }
        return todayPay;
    }
    //한달에 마지막 일자 구하기, 월급 계산 식에 사용
    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    //월급계산식
    getTotalPayMonth(pay, startDay, paybackDay) {
        const today = new Date();
        // 만약 paybackDay가 주어지지 않았다면 한 달 후의 날짜로 설정
        if (!paybackDay) {
            paybackDay = this.getDaysInMonth(startDay.getFullYear(), startDay.getMonth());
        }
        let workDays;
        if (today.getDate() >= paybackDay) {
            workDays = today.getDate() - startDay.getDate();
        }
        else {
            const daysInLastMonth = this.getDaysInMonth(today.getFullYear(), today.getMonth() - 1);
            workDays = today.getDate() + (daysInLastMonth - startDay.getDate());
        }
        // 하루치 급여 계산
        const daysInCurrentMonth = this.getDaysInMonth(today.getFullYear(), today.getMonth());
        const dailyPay = pay / daysInCurrentMonth;
        return dailyPay * workDays;
    }
    //휴게시간, 월급, 시급인지 계산이 필요함
    //급여일 기준으로 계산해야함
    getTotalPay(hourlyPay, startDay, workDays, startTime, endTime, breakTime, paybackDay) {
        //시간당 급여를 확인하고 startDay로 근무시작일을 확인하고 workDay로 오늘 날짜까지 근무 일수를 확인한다.
        //startTime, endTime 사이에 시간을 확인해서 사이시간에 급여를 곱해서 총 급여를 계산한다.
        //10000 2023-07-06T00:00:00.000Z [ '1', '2', '3', '4' ] 01:00 03:00
        //breakTime 휴게시간 이있으면 계산시 휴게시간을 뺀다
        if (!paybackDay)
            paybackDay = 5;
        const startParts = startTime.split(":").map(Number);
        if (startParts.length !== 2) {
            console.log("Invalid start time format");
            return 0;
        }
        const [startHour, startMinute] = startParts;
        const endParts = endTime.split(":").map(Number);
        if (endParts.length !== 2) {
            console.log("Invalid end time format");
            return 0;
        }
        const [endHour, endMinute] = endParts;
        if (endHour == null ||
            endMinute == null ||
            startHour == null ||
            startMinute == null)
            return 0;
        let totalHoursPerDay = endHour + endMinute / 60 - (startHour + startMinute / 60);
        if (totalHoursPerDay < 0) {
            totalHoursPerDay += 24; // Adjust if the work period extends to the next day
        }
        // Calculate number of work days from start day to today
        const startDateMoment = (0, moment_1.default)(startDay);
        const todayMoment = (0, moment_1.default)();
        let totalWorkDays = 0;
        while (startDateMoment.isSameOrBefore(todayMoment)) {
            const refine = workDays.map(Number);
            if (refine.includes(parseInt(startDateMoment.format("E")))) {
                totalWorkDays++;
            }
            startDateMoment.add(1, "days");
        }
        // Calculate total pay
        let totalPay = totalWorkDays * totalHoursPerDay * hourlyPay;
        //휴게시간 계산해서 빼기
        let refineBreakTime = 0;
        if (breakTime == "00-30") {
            refineBreakTime = 0.5;
            totalPay = totalPay - totalWorkDays * refineBreakTime;
        }
        if (breakTime == "01-00") {
            refineBreakTime = 1;
            //refineBreakTime * totalWorkDays * hourlyPay;
            totalPay = totalPay - totalWorkDays * (hourlyPay * refineBreakTime);
        }
        if (breakTime == "01-30") {
            refineBreakTime = 1.5;
            totalPay = totalPay - totalWorkDays * refineBreakTime;
        }
        if (totalPay < 0) {
            return Math.abs(totalPay);
        }
        return Math.floor(totalPay);
    }
    //출근체크 시 근무시간 30분 전후에 출근체크 가능
    getWorkStartTime(startTime, endTime, currentTime) {
        // Convert your times to moment objects
        //20:00 03:00 2023-10-08 00:40:28
        const startMoment = (0, moment_1.default)(startTime, "HH:mm");
        const endMoment = (0, moment_1.default)(endTime, "HH:mm");
        const currentMoment = (0, moment_1.default)(currentTime);
        // Adjust the start and end moments based on the current date
        startMoment
            .year(currentMoment.year())
            .month(currentMoment.month())
            .date(currentMoment.date());
        endMoment
            .year(currentMoment.year())
            .month(currentMoment.month())
            .date(currentMoment.date());
        // If the end time is before the start time, assume it's for the next day
        if (endMoment.isBefore(startMoment)) {
            endMoment.add(1, "days");
        }
        // Create moments for 30 minutes before and after the start time
        const beforeStart = startMoment.clone().subtract(30, "minutes");
        const afterStart = startMoment.clone().add(30, "minutes");
        // Check if current time is within 30 minutes of the start time
        if (currentMoment.isBetween(beforeStart, afterStart)) {
            return "OK";
        }
        else {
            return "NO";
        }
    }
    getFirstDayOfWeek(year, month, week) {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const firstDay = new Date(firstDayOfMonth);
        firstDay.setDate(firstDay.getDate() + (week - 1) * 7);
        while (firstDay.getDay() !== 1) {
            firstDay.setDate(firstDay.getDate() - 1);
        }
        return firstDay;
    }
    getLastDayOfWeek(year, month, week) {
        const firstDay = this.getFirstDayOfWeek(year, month, week);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);
        return lastDay;
    }
    formatMonth(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${month}-${day}`;
    }
    getWeekDates(year, month, numWeeks) {
        const weeks = [];
        for (let week = 1; week <= numWeeks; week++) {
            const firstDay = this.getFirstDayOfWeek(year, month, week);
            const lastDay = this.getLastDayOfWeek(year, month, week);
            const formattedFirstDay = this.formatMonth(firstDay);
            const formattedLastDay = this.formatMonth(lastDay);
            weeks.push({
                week: week,
                start: formattedFirstDay,
                end: formattedLastDay,
                totalHours: 0,
            });
        }
        return weeks;
    }
};
exports.DtService = DtService = __decorate([
    (0, common_1.Injectable)()
], DtService);


/***/ }),

/***/ 99:
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ 101:
/***/ ((module) => {

module.exports = require("xlsx");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7c139008b91c1b20b2af")
/******/ })();
/******/ 
/******/ }
;