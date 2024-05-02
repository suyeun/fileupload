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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const http_exception_1 = require("../../../exceptions/http-exception");
let RequestService = class RequestService {
    constructor(httpService) {
        this.httpService = httpService;
        this.options = {
            timeout: 5000,
            maxRedirects: 5,
        };
    }
    get(url, options = this.options) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.httpService
                .get(url, options)
                .pipe((0, rxjs_1.map)((res) => res.data))
                .pipe((0, rxjs_1.catchError)(() => {
                throw (0, http_exception_1.exceptionResult)('Failed HTTP request..');
            }));
            return yield (0, rxjs_1.lastValueFrom)(request);
        });
    }
    find(url, options = this.options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.httpService.axiosRef.get(url, options);
            return result.data;
        });
    }
};
RequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=http.service.js.map