"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 50:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const typeorm_2 = __webpack_require__(39);
const entities_1 = __webpack_require__(37);
let UserRepository = exports.UserRepository = class UserRepository {
    constructor(userRepository, workRepository, dataSource) {
        this.userRepository = userRepository;
        this.workRepository = workRepository;
        this.dataSource = dataSource;
    }
    //로그인 토큰 업데이트
    update(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { raw } = yield this.dataSource.getRepository(entities_1.User).update({
                    id: userId,
                }, {
                    accessToken: token,
                });
                return raw;
            }
            catch (error) {
                return error;
            }
        });
    }
    //로그인시 등록된 근무지가 있는지 확인
    findInProgressWorks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.workRepository.find({ where: { userId, state: "DONE" } });
        });
    }
    load(accId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.dataSource.manager;
            // query need change!!!
            const result = yield entityManager.query(`
        SELECT
            SC.nano_id AS spaceId,
            SC.name AS name,
            SC.description AS description,
            SCO.attribute AS attribute
        FROM TB_SPACE AS SC
        JOIN TB_SPACE_OBJECT SCO ON SCO.space_id = SC.nano_id 
        WHERE SC.creator_id = ? LIMIT 1;
      `, [accId]);
            return result;
        });
    }
    findAll(accId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.dataSource.manager;
            // query need change!!!
            const result = yield entityManager.query(`
        SELECT
            SC.nano_id AS spaceId,
            SC.name AS name,
            SC.description AS description,
            SCO.attribute AS attribute
        FROM TB_SPACE AS SC
        JOIN TB_SPACE_OBJECT SCO ON SCO.space_id = SC.nano_id 
        WHERE SC.creator_id = ? LIMIT 1;
      `, [accId]);
            return result;
        });
    }
    category() {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.dataSource.manager;
            // query need change!!!
            const result = yield entityManager.query(`
        SELECT 
          cate.nanoid AS id, 
          cate.id AS subcategory, 
          cate.name, 
          cate.description,
          cate.depth, 
          parent.nanoid AS parent_id,
          cate.thumbnail AS icon,
          cate.type, 
          UNIX_TIMESTAMP(cate.update_at) * 1000 AS upAt
        FROM 
          TB_SPACE_CATEGORY AS cate
        LEFT JOIN 
          TB_SPACE_CATEGORY AS parent 
        ON 
          cate.parent_id = parent.nanoid
        WHERE cate.deleted = 0 AND cate.is_show = 1;
      `);
            return result;
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield this.dataSource.getRepository(entities_1.User).findOne({
                select: ["id", "accessToken"],
                where: {
                    accessToken: token,
                },
                order: {
                    id: "ASC",
                },
            });
            return raw;
        });
    }
    createGuest(channelId, deviceId, platform, provider, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { raw } = yield this.dataSource.getRepository(entities_1.User).insert({
                channelId: channelId,
                name: "guest",
                deviceId: deviceId,
                email: "guest@thetory.io",
                platform: platform,
                role: "user",
                provider: provider,
                accessToken: token,
            });
            if (raw) {
                return raw;
            }
            else {
                return;
            }
        });
    }
};
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Work)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
], UserRepository);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0ca25b38cf8463b9fcf2")
/******/ })();
/******/ 
/******/ }
;