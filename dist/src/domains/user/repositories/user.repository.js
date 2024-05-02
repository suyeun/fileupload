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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../../entities");
let UserRepository = class UserRepository {
    constructor(userRepository, dataSource) {
        this.userRepository = userRepository;
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
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map