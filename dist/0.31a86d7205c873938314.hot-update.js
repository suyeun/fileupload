"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 35:
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
exports.UserModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const Entities = __importStar(__webpack_require__(37));
//import { Work } from '../work/work.entity';
const Controllers = __importStar(__webpack_require__(40));
const Repositories = __importStar(__webpack_require__(49));
const Services = __importStar(__webpack_require__(47));
const Modules = __importStar(__webpack_require__(14));
const google_auth_library_1 = __webpack_require__(68);
const oauth2_service_1 = __webpack_require__(67);
const jwt_service_1 = __webpack_require__(71);
const kakao_strategy_1 = __webpack_require__(74);
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
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
            google_auth_library_1.OAuth2Client,
            oauth2_service_1.OAuthService,
            jwt_service_1.JwtService,
            kakao_strategy_1.KakaoStrategy,
        ],
    })
], UserModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f0840c974f947898ac2c")
/******/ })();
/******/ 
/******/ }
;