/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	/**
	 * @param {boolean=} fromUpdate true when called from update
	 */
	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(4);
const core_1 = __webpack_require__(5);
const platform_express_1 = __webpack_require__(6);
const logger_config_1 = __importDefault(__webpack_require__(7));
const app_module_1 = __webpack_require__(12);
const exception_common_1 = __webpack_require__(85);
const dotenv_config_1 = __webpack_require__(86);
const path = __importStar(__webpack_require__(11));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (yield Promise.resolve().then(() => __importStar(__webpack_require__(88)))).default;
        const appNest = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(app));
        const port = Number(process.env["APP_PORT"]) || 3001;
        // Exception filter
        appNest.useGlobalFilters(new exception_common_1.HttpExceptionFilter());
        appNest.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
            disableErrorMessages: true, // Error 발생시 Error Message 포함 여부(true: 포함, false: 비포함)
        }));
        appNest.enableCors({
            origin: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
        });
        appNest.use("/google_test", function (req, res) {
            console.log(req, res);
            console.log(path.join(__dirname, "../src/google_sign_in.html"));
            res.sendFile(path.join(__dirname, "../src/google_sign_in.html"));
        });
        appNest.use("/kakao_test", function (req, res) {
            console.log(req, res);
            console.log(path.join(__dirname, "../src/kakao.html"));
            res.sendFile(path.join(__dirname, "../src/kakao.html"));
        });
        const server = yield appNest.listen(port, () => {
            logger_config_1.default.info(`Nest.js API-Server ready to http://localhost:${port}/`);
        });
        // gracefully shutdown
        server.on("SIGINT", () => {
            // TODO: complete this
            logger_config_1.default.error("[ERROR] SIGINT..");
        });
        // hot reload
        if (true) {
            module.hot.accept();
            module.hot.dispose(() => appNest.close());
        }
    });
}
(0, dotenv_config_1.configDotenv)();
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(8);
const winston_1 = __importDefault(__webpack_require__(9));
const app_root_path_1 = __webpack_require__(10);
const path_1 = __webpack_require__(11);
const logDir = (0, path_1.join)(app_root_path_1.path, 'logs');
const isDev = process.env['NODE_ENV'] === 'development';
const isTest = process.env['NODE_ENV'] === 'test';
const appName = (_a = process.env['APP_NAME']) !== null && _a !== void 0 ? _a : 'SEERSLAB';
const datePattern = 'YY-MM-DD';
const timezone = () => {
    return new Date().toLocaleString('EU', {
        timeZone: 'Asia/Seoul',
    });
};
exports["default"] = winston_1.default.createLogger({
    level: isDev ? 'debug' : 'info',
    // defaultMeta: { service: appName },
    format: winston_1.default.format.combine(winston_1.default.format.simple(), winston_1.default.format.timestamp({ format: timezone })),
    silent: isTest,
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple(), winston_1.default.format.timestamp()),
        }),
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
            level: 'error',
            datePattern,
            dirname: `${logDir}/error`,
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true,
            silent: isTest,
        }),
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
            level: 'debug',
            datePattern,
            dirname: `${logDir}/debug`,
            filename: `%DATE%.debug.log`,
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true,
            silent: isTest,
        }),
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
            level: 'info',
            datePattern,
            dirname: `${logDir}/info`,
            filename: `%DATE%.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true,
            silent: isTest,
        }),
        new winston_1.default.transports.DailyRotateFile({
            format: winston_1.default.format.combine(
            // 색상 형식을 제거
            winston_1.default.format.uncolorize(), winston_1.default.format.simple()),
            level: 'warn',
            datePattern,
            dirname: `${logDir}/warn`,
            filename: `%DATE%.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true,
            silent: isTest,
        }),
    ],
});


/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("app-root-path");

/***/ }),
/* 11 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.AppModule = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(13);
const DomainModules = __importStar(__webpack_require__(14));
const typeorm_config_1 = __webpack_require__(77);
const filter_module_1 = __webpack_require__(79);
const app_controller_1 = __webpack_require__(81);
const logger_middleware_1 = __webpack_require__(83);
const interceptor_module_1 = __webpack_require__(84);
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .exclude("/", "/favicon.ico")
            .forRoutes("*");
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
            }),
            typeorm_config_1.OrmDataSource,
            ...Object.values(DomainModules),
        ],
        controllers: [app_controller_1.AppController],
        providers: [...filter_module_1.FilterModule, ...interceptor_module_1.InterceptorModule],
    })
], AppModule);


/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.SharedModule = void 0;
const common_1 = __webpack_require__(4);
const Modules = __importStar(__webpack_require__(16));
let SharedModule = exports.SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [...Object.values(Modules)],
        controllers: [],
        exports: [...Object.values(Modules)],
        providers: [],
    })
], SharedModule);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(4);
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({})
], DatabaseModule);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisClientModule = void 0;
const common_1 = __webpack_require__(4);
let RedisClientModule = exports.RedisClientModule = class RedisClientModule {
};
exports.RedisClientModule = RedisClientModule = __decorate([
    (0, common_1.Module)({
        providers: [],
        exports: [],
    })
], RedisClientModule);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionModule = void 0;
const common_1 = __webpack_require__(4);
let SessionModule = exports.SessionModule = class SessionModule {
};
exports.SessionModule = SessionModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [],
        exports: [],
    })
], SessionModule);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpRequestModule = void 0;
const common_1 = __webpack_require__(4);
const axios_1 = __webpack_require__(21);
const http_service_1 = __webpack_require__(22);
let HttpRequestModule = exports.HttpRequestModule = class HttpRequestModule {
};
exports.HttpRequestModule = HttpRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 1000,
                maxRedirects: 5,
            }),
        ],
        providers: [http_service_1.RequestService],
        exports: [http_service_1.RequestService],
    })
], HttpRequestModule);


/***/ }),
/* 21 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/axios");

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestService = void 0;
const common_1 = __webpack_require__(4);
const axios_1 = __webpack_require__(21);
const rxjs_1 = __webpack_require__(23);
const http_exception_1 = __webpack_require__(24);
let RequestService = exports.RequestService = class RequestService {
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
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], RequestService);


/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exceptionResult = exports.HttpException = void 0;
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(25);
class HttpException extends common_1.HttpException {
    constructor(message, status, code) {
        super(message, status);
        this.code = code !== null && code !== void 0 ? code : 0;
    }
}
exports.HttpException = HttpException;
function exceptionResult(text, status = common_1.HttpStatus.BAD_REQUEST, code = constants_1.NETWORK_ERROR_CODE.FAIL) {
    return new HttpException(text, status, code);
}
exports.exceptionResult = exceptionResult;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
//@index('./*.ts', f => f.path !== "index.ts" ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(27), exports);
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(29), exports);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FILE = exports.BANNER = exports.SQUARE = exports.ROOM = void 0;
exports.ROOM = 'room';
exports.SQUARE = 'square';
exports.BANNER = 'banner';
exports.FILE = {
    FORBIDDEN_WORD: 'forbidden_word',
    ASSET_BUNDLE: 'asset_bundle',
    ROOM_DATA: 'room_data',
    AVATAR_ASSET_AOS: 'avatar_asset_aos',
    AVATAR_ASSET_IOS: 'avatar_asset_ios',
};


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_CODE = void 0;
exports.ERROR_CODE = {
    OK: 200,
    SERVER_MAINTENANCE: 1000,
    QUERY_EXEC_ERROR: 20000,
    INVALID_INPUT: 20001,
    USER_NOT_FOUND_ERROR: 20002,
    PAYLOAD_NOT_FOUND: 20003,
    TOKEN_EXPIRED_ERROR: 20004,
    INVALID_TOKEN_ERROR: 20005,
    DUPLICATE_WORK: 30000,
    WORK_NOT_REGISTERED: 30001,
    CHECK_TIME_NEED: 40001,
    NEED_CHECK_CALCULATION: 40002,
    POINT_CHECK_NEED: 50000,
    ALREADY_PAID: 50001, //포인트 이미 지급됨
};


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NETWORK_ERROR_CODE = void 0;
exports.NETWORK_ERROR_CODE = {
    SUCCESS: 200,
    FAIL: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENT: 501,
    SQL_EXCEPTION: 600,
    SERVER_MAINTENANCE: 1000,
    NOT_FOUND_USER: 2000,
    INVALID_PASSWORD_ERROR: 2001,
    EXISTING_USER: 2003,
    EXPIRE_DATE: 3000,
    NOT_CONNECT_SERVER: 9999,
    INVALID_REQUEST_PARAMETER: 10000,
    CONTENTS_NOTFOUND: 10001,
    DB_INSERT_EXCEPTION: 10002,
    CONTENTS_DUPLICATED: 10003,
    ROOM_USER_MAX_OVER: 10004,
    DB_UPDATE_EXCEPTION: 10005,
    AWS_CDN_INVALIDATION_EXCEPTION: 10006,
};


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.API = void 0;
class API {
}
exports.API = API;
API.NFT_IMAGE_GALLERY = 'https://polygon-mumbai.g.alchemy.com/nft/v2/LHa8IuNu6lXI6de12LL1Uw7j6HSLCyFl/getNFTsForCollection?contractAddress=0x0552B23f5aC8561548987368B7b3B1e9124De892&withMetadata=true&startToken=1';


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AwsModule = void 0;
const common_1 = __webpack_require__(4);
const aws_service_1 = __webpack_require__(31);
const config_1 = __webpack_require__(13);
let AwsModule = exports.AwsModule = class AwsModule {
};
exports.AwsModule = AwsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true /* set global class */ })],
        providers: [aws_service_1.AWSService],
        exports: [aws_service_1.AWSService],
    })
], AwsModule);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AWSService = exports.mysqlNanoidPromise = exports.nanoidPromise = exports.FileDto = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(13);
const aws_sdk_1 = __importDefault(__webpack_require__(32));
const mime_1 = __importDefault(__webpack_require__(33));
const logger_config_1 = __importDefault(__webpack_require__(7));
// =================================
const nanoid_1 = __webpack_require__(34);
// =================================
var S3Path;
(function (S3Path) {
    S3Path["USER_PROFILE"] = "mirrorcity/user/profile";
    S3Path["PARTS_THUMBNAIL"] = "mirrorcity/avatar/parts/thumbnail";
    S3Path["PARTS_AOS_ASSETBUNDLE"] = "mirrorcity/avatar/parts/assetbundle/aos";
    S3Path["PARTS_IOS_ASSETBUNDLE"] = "mirrorcity/avatar/parts/assetbundle/ios";
    S3Path["PARTS_WEB_ASSETBUNDLE"] = "mirrorcity/avatar/parts/assetbundle/web";
    S3Path["AVATAR_THUMBNAIL"] = "mirrorcity/avatar/thumbnail";
    S3Path["AVATAR_PRESET_THUMBNAIL"] = "mirrorcity/avatar/preset/thumbnail";
    S3Path["ROOM_THUMBNAIL"] = "mirrorcity/space/thumbnail";
    S3Path["SPACE_PRESET_THUMBNAIL"] = "mirrorcity/space/preset/thumbnail";
})(S3Path || (S3Path = {}));
// export { S3Path };
// =================================
class FileDto {
}
exports.FileDto = FileDto;
const nanoidPromise = (size) => (0, nanoid_1.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', size);
exports.nanoidPromise = nanoidPromise;
const mysqlNanoidPromise = (size) => (0, nanoid_1.customAlphabet)('0123456789abcdefghijklmnopqrstuvwxyz', size);
exports.mysqlNanoidPromise = mysqlNanoidPromise;
// https://www.npmjs.com/package/aws-sdk
// https://www.npmjs.com/package/@aws-sdk/client-ses
// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
// https://www.freecodecamp.org/news/how-to-upload-files-to-aws-s3-with-node/
// https://www.npmjs.com/package/@aws-sdk/client-s3
// https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/upload-objects.html
// [file upload]
// https://songsong.dev/entry/S3%EC%97%90-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EB%8A%94-%EC%84%B8-%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95
// https://inpa.tistory.com/entry/AWS-SDK-%F0%9F%91%A8%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB-Nodejs-%EC%97%B0%EB%8F%99-%EB%B0%8F-SDK-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EB%B2%95
// TODO: make this class methods async
let AWSService = exports.AWSService = class AWSService {
    constructor(configService) {
        this.configService = configService;
        aws_sdk_1.default.config.update({ region: 'ap-northeast-2' });
        this.s3 = new aws_sdk_1.default.S3({});
        this.S3_BUCKET = this.configService.get('BUCKET', '');
    }
    profileUpload(fileBuffer, accId, extension) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `${S3Path.USER_PROFILE}/${accId.toString()}.${extension}`;
                const contentType = mime_1.default.lookup(extension) || 'Application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: fileBuffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                yield this.s3.putObject(params).promise();
                return key;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return '';
            }
        });
    }
    fileUpload(fileBuffer, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const extension = key.split('.').pop() || '';
                const contentType = mime_1.default.lookup(extension) || 'application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: fileBuffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                yield this.s3.putObject(params).promise();
                return key;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return '';
            }
        });
    }
    avatarProfileUploadFromFileDto({ file, extension }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!file)
                    return ['', ''];
                const randomId = yield (0, exports.nanoidPromise)(10)();
                extension = extension || 'png';
                const fileBuffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const fileName = `${randomId}.${extension}`;
                const key = `${S3Path.AVATAR_THUMBNAIL}/${fileName}`;
                const contentType = mime_1.default.lookup(extension) || 'Application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: fileBuffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                yield this.s3.putObject(params).promise();
                return [fileName, key];
            }
            catch (err) {
                logger_config_1.default.error(err);
                return ['', ''];
            }
        });
    }
    avatarProfileUploadFromPresetThumbnail(presetThumbnail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!presetThumbnail)
                    return ['', ''];
                const randomId = yield (0, exports.nanoidPromise)(10)();
                const fileName = `${randomId}.${presetThumbnail.split('.')[1]}`;
                const key = `${S3Path.AVATAR_THUMBNAIL}/${randomId}.${presetThumbnail.split('.')[1]}`;
                const isCopy = yield this.cpFile(presetThumbnail, key);
                if (!isCopy)
                    return ['', ''];
                return [fileName, key];
            }
            catch (err) {
                logger_config_1.default.error(err);
                return ['', ''];
            }
        });
    }
    putObject(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `tmp/${file.originalname}`;
                // const keys = key.split('.');
                const contentType = mime_1.default.lookup(key) || 'Application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: file.buffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                const resultS3 = yield this.s3.putObject(params).promise();
                console.log(resultS3);
                return key;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return '';
            }
        });
    }
    getSignedUrl(uploadFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const array = [];
                uploadFiles.forEach((v) => {
                    if (!v)
                        return;
                    const files = v.split('.');
                    const fileName = files[1] ? `${files[0]}.${files[1]}` : files[0];
                    const key = `tmp/${fileName}`;
                    const contentType = mime_1.default.lookup(key) || 'Application/octet-stream';
                    const params = {
                        Bucket: this.S3_BUCKET,
                        Key: key,
                        ACL: 'public-read',
                        ContentType: contentType,
                        Expires: 120, // pre-signed URL 만료 시간 (초 단위)
                    };
                    array.push({ filePath: key, signedUrl: this.s3.getSignedUrl('putObject', params) });
                });
                return array;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return [];
            }
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                };
                yield this.s3.deleteObject(params).promise();
                return true;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return false;
            }
        });
    }
    cpFile(originKey, newKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.S3_BUCKET,
                    CopySource: `${this.S3_BUCKET}/${originKey}`,
                    Key: newKey,
                    ACL: 'public-read', // Set the object access control to public-read
                };
                yield this.s3.copyObject(params).promise();
                return true;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return false;
            }
        });
    }
};
exports.AWSService = AWSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AWSService);


/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";
module.exports = require("aws-sdk");

/***/ }),
/* 33 */
/***/ ((module) => {

"use strict";
module.exports = require("mime");

/***/ }),
/* 34 */
/***/ ((module) => {

"use strict";
module.exports = require("nanoid");

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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


/***/ }),
/* 36 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/typeorm");

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}';` : "")
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
__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(39);
let User = exports.User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "int",
        comment: "사용자 아이디",
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "NAME",
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "사용자 이름",
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "EMAIL",
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "이메일",
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "PLATFORM",
        type: "varchar",
        length: 100,
        nullable: true,
        default: "aos",
        comment: "",
    }),
    __metadata("design:type", String)
], User.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "ROLE",
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "",
        default: "user",
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PHONE", default: null, comment: "핸드폰 번호" }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "TOKEN", default: null }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "REG_DT", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "regDt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATE_DT",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updateDt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DELETED", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "TB_FUN_USER" })
], User);


/***/ }),
/* 39 */
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(4);
const USER_DTO = __importStar(__webpack_require__(42));
const services_1 = __webpack_require__(47);
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    //소셜로그인
    social(body) {
        return this.userService.social(body);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("/social"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof USER_DTO !== "undefined" && USER_DTO.UserSocialDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "social", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("api/v1/users"),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
//@index('./**/*.ts', f => f.path !== `./index` ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSocialDTO = void 0;
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
class Command {
}
class UserSocialDTO {
}
exports.UserSocialDTO = UserSocialDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Command),
    __metadata("design:type", Command)
], UserSocialDTO.prototype, "command", void 0);


/***/ }),
/* 44 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 45 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PortOneDTO = void 0;
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
class Command {
}
class PortOneDTO {
}
exports.PortOneDTO = PortOneDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Command),
    __metadata("design:type", Command)
], PortOneDTO.prototype, "command", void 0);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(25);
const repositories_1 = __webpack_require__(49);
const interfaces_1 = __webpack_require__(51);
const oauth2_service_1 = __webpack_require__(67);
const jwt_service_1 = __webpack_require__(71);
let UserService = exports.UserService = class UserService {
    constructor(userRepository, oAuthService, jwtService) {
        this.userRepository = userRepository;
        this.oAuthService = oAuthService;
        this.jwtService = jwtService;
    }
    handleSocialLogin(provider, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let channelId = "";
            let name = "";
            let email = "";
            if (provider === "kakao") {
                console.log("kakao payload", payload.data);
                channelId = payload.data.id;
                name = "";
                email = payload.data.kakao_account.email;
            }
            else {
                channelId = payload.sub;
                name = payload.given_name;
                email = payload.email;
            }
            return email;
        });
    }
    //소셜 로그인
    social(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider, idToken, deviceId, name } = body.command;
            let payload = null;
            if (provider === "kakao") {
                payload = yield this.oAuthService.verifyIdTokenKakao(idToken, provider);
            }
            else {
                payload = yield this.oAuthService.verifyIdToken(idToken, provider);
            }
            if (!payload) {
                return (0, interfaces_1.JsonResponse)({}, constants_1.ERROR_CODE.PAYLOAD_NOT_FOUND, "PAYLOAD NOT FOUND");
            }
            const userObject = yield this.handleSocialLogin(provider, payload);
            if (!userObject) {
                return (0, interfaces_1.JsonResponse)({}, constants_1.ERROR_CODE.USER_NOT_FOUND_ERROR, "USER_NOT_FOUND_ERROR");
            }
            const userObjects = userObject[0];
            userObjects.isWork = false;
            const accessToken = yield this.jwtService.getAccessToken(userObjects.id);
            //console.log('accessToken', accessToken);
            if (accessToken) {
                userObjects.accessToken = accessToken;
            }
            const tokenUpdate = yield this.userRepository.update(userObjects.id, accessToken);
            //certificationKey
            userObjects.certificationKey = userObjects.certificationKey ? true : false;
            userObjects.platform = "aos";
            userObjects.role = "user";
            userObjects.provider = "google";
            return (0, interfaces_1.JsonResponse)(userObjects, 200, "OK");
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.UserRepository !== "undefined" && repositories_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof oauth2_service_1.OAuthService !== "undefined" && oauth2_service_1.OAuthService) === "function" ? _b : Object, typeof (_c = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _c : Object])
], UserService);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(50), exports);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const typeorm_2 = __webpack_require__(39);
const entities_1 = __webpack_require__(37);
let UserRepository = exports.UserRepository = class UserRepository {
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
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object])
], UserRepository);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
//@index('./**/*.ts', f => f.path !== "index.ts" ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(52), exports);
__exportStar(__webpack_require__(66), exports);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.responseJson = exports.JsonResponse = void 0;
const common_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(53);
const logger_config_1 = __importDefault(__webpack_require__(7));
function JsonResponse(data, status = common_1.HttpStatus.OK, text) {
    logger_config_1.default.debug(`[JsonResponse] ${status} ${text}`);
    return {
        status: status,
        message: text,
        command: data,
        timestamp: (0, utils_1.localDatetime)(),
    };
}
exports.JsonResponse = JsonResponse;
function responseJson(opt) {
    return JsonResponse(opt.data, opt.state, opt.text);
}
exports.responseJson = responseJson;


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
//@index('./**/*.ts', f => f.path !== "index.ts" ? `export * from '${f.path}';` : "")
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);
__exportStar(__webpack_require__(56), exports);
__exportStar(__webpack_require__(58), exports);
__exportStar(__webpack_require__(60), exports);
__exportStar(__webpack_require__(61), exports);
__exportStar(__webpack_require__(63), exports);
__exportStar(__webpack_require__(65), exports);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTime = void 0;
class CTime {
    static getUTC() {
        return new Date();
    }
    static getServerTime(zone = CTime.Zone.Code.UTC) {
        return this.getUTC().getTime() + CTime.Zone.Offset.get(zone);
    }
    static getServerDate(zone = CTime.Zone.Code.UTC) {
        return new Date(this.getUTC().getTime() + CTime.Zone.Offset.get(zone));
    }
    static getPassedMondayDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return date.getTime() - (date.getTime() % CTime.Milliseconds.Week) + CTime.Zone.Offset.get(zone);
    }
    static getPassedMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return date.getTime() - (date.getTime() % CTime.Milliseconds.Day) + CTime.Zone.Offset.get(zone);
    }
    static getApproachMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return (date.getTime() - (date.getTime() % CTime.Milliseconds.Day) + CTime.Milliseconds.Day + CTime.Zone.Offset.get(zone));
    }
    static getPassedMondayMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        return this.getPassedMidnightDate(zone, monday);
    }
    static getApproachMondayMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        return this.getPassedMidnightDate(zone, monday) + this.Milliseconds.Week;
    }
    static getToday(zone = CTime.Zone.Code.UTC) {
        const today = this.getServerDate(zone).getDay();
        return CTime.Day.get(today);
    }
    static getPassedWeekDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return date.getTime() - CTime.Milliseconds.Week + CTime.Zone.Offset.get(zone);
    }
}
exports.CTime = CTime;
CTime.Seconds = (_a = class {
    },
    __setFunctionName(_a, "Seconds"),
    _a.Min = 60,
    _a.Hour = 60 * 60,
    _a.Day = 60 * 60 * 24,
    _a);
CTime.Milliseconds = (_b = class {
    },
    __setFunctionName(_b, "Milliseconds"),
    _b.Tick = 100,
    _b.Sec = 1000,
    _b.Min = 60 * 1000,
    _b.Hour = 60 * 60 * 1000,
    _b.Day = 60 * 60 * 24 * 1000,
    _b.Week = 60 * 60 * 24 * 7 * 1000,
    _b);
CTime.Zone = (_c = class {
    },
    __setFunctionName(_c, "Zone"),
    _c.Code = (_d = class {
            static Array() {
                return [
                    this.UTC,
                    this.KR,
                    this.JP,
                    this.CN,
                    this.ID,
                    this.TH,
                    this.VN,
                    this.RU,
                    this.ES,
                    this.FR,
                    this.DE,
                    this.PT,
                    this.NL,
                    this.IT,
                    this.US,
                ];
            }
        },
        __setFunctionName(_d, "Code"),
        _d.UTC = 0,
        _d.KR = 1 // 대한민국
    ,
        _d.JP = 2 // 일본
    ,
        _d.CN = 3 // 중국
    ,
        _d.ID = 4 // 인도네시아 (서부)
    ,
        _d.TH = 5 // 태국
    ,
        _d.VN = 6 // 베트남
    ,
        _d.RU = 7 // 러시아
    ,
        _d.ES = 8 // 스페인
    ,
        _d.FR = 9 // 프랑스
    ,
        _d.DE = 10 // 독일
    ,
        _d.PT = 11 // 포르투칼
    ,
        _d.NL = 12 // 네덜란드
    ,
        _d.IT = 13 // 이탈리아
    ,
        _d.US = 14 // 미국 (동부)
    ,
        _d.Names = [
            'UTC',
            'KR',
            'JP',
            'CN',
            'ID',
            'TH',
            'VN',
            'RU',
            'ES',
            'FR',
            'DE',
            'PT',
            'NL',
            'IT',
            'US',
        ],
        _d),
    _c.Offset = (_e = class {
            static get(zone) {
                switch (zone) {
                    case CTime.Zone.Code.UTC: {
                        return CTime.Zone.Offset.UTC;
                    }
                    case CTime.Zone.Code.KR: {
                        return CTime.Zone.Offset.KR;
                    }
                    case CTime.Zone.Code.JP: {
                        return CTime.Zone.Offset.JP;
                    }
                    case CTime.Zone.Code.CN: {
                        return CTime.Zone.Offset.CN;
                    }
                    case CTime.Zone.Code.ID: {
                        return CTime.Zone.Offset.ID;
                    }
                    case CTime.Zone.Code.TH: {
                        return CTime.Zone.Offset.TH;
                    }
                    case CTime.Zone.Code.VN: {
                        return CTime.Zone.Offset.VN;
                    }
                    case CTime.Zone.Code.RU: {
                        return CTime.Zone.Offset.RU;
                    }
                    case CTime.Zone.Code.ES: {
                        return CTime.Zone.Offset.ES;
                    }
                    case CTime.Zone.Code.FR: {
                        return CTime.Zone.Offset.FR;
                    }
                    case CTime.Zone.Code.DE: {
                        return CTime.Zone.Offset.DE;
                    }
                    case CTime.Zone.Code.PT: {
                        return CTime.Zone.Offset.PT;
                    }
                    case CTime.Zone.Code.NL: {
                        return CTime.Zone.Offset.NL;
                    }
                    case CTime.Zone.Code.IT: {
                        return CTime.Zone.Offset.IT;
                    }
                    case CTime.Zone.Code.US: {
                        return CTime.Zone.Offset.US;
                    }
                }
                return CTime.Zone.Offset.UTC;
            }
        },
        __setFunctionName(_e, "Offset"),
        _e.UTC = 0,
        _e.KR = CTime.Milliseconds.Hour * 9,
        _e.JP = CTime.Milliseconds.Hour * 9,
        _e.CN = CTime.Milliseconds.Hour * 8,
        _e.ID = CTime.Milliseconds.Hour * 7,
        _e.TH = CTime.Milliseconds.Hour * 7,
        _e.VN = CTime.Milliseconds.Hour * 7,
        _e.RU = CTime.Milliseconds.Hour * 3,
        _e.ES = CTime.Milliseconds.Hour,
        _e.FR = CTime.Milliseconds.Hour,
        _e.DE = CTime.Milliseconds.Hour,
        _e.PT = CTime.Milliseconds.Hour,
        _e.NL = CTime.Milliseconds.Hour,
        _e.IT = CTime.Milliseconds.Hour,
        _e.US = CTime.Milliseconds.Hour * -5,
        _e),
    _c);
CTime.Util = class {
    static convertPassedMidnightDate(date, zone = CTime.Zone.Code.UTC) {
        return date - (date % CTime.Milliseconds.Day) + CTime.Zone.Offset.get(zone);
    }
    static convertApproachMidnightDate(date, zone = CTime.Zone.Code.UTC) {
        return date - (date % CTime.Milliseconds.Day) + CTime.Milliseconds.Day + CTime.Zone.Offset.get(zone);
    }
};
CTime.Day = (_f = class {
        static get(day) {
            switch (day) {
                case CTime.Day.Server.Mon: {
                    return CTime.Day.Data.Mon;
                }
                case CTime.Day.Server.Tue: {
                    return CTime.Day.Data.Tue;
                }
                case CTime.Day.Server.Wed: {
                    return CTime.Day.Data.Wed;
                }
                case CTime.Day.Server.Thr: {
                    return CTime.Day.Data.Thr;
                }
                case CTime.Day.Server.Fri: {
                    return CTime.Day.Data.Fri;
                }
                case CTime.Day.Server.Sat: {
                    return CTime.Day.Data.Sat;
                }
                case CTime.Day.Server.Sun: {
                    return CTime.Day.Data.Sun;
                }
                default: {
                    return -1;
                }
            }
        }
    },
    __setFunctionName(_f, "Day"),
    _f.Server = (_g = class {
        },
        __setFunctionName(_g, "Server"),
        _g.Mon = 1,
        _g.Tue = 2,
        _g.Wed = 3,
        _g.Thr = 4,
        _g.Fri = 5,
        _g.Sat = 6,
        _g.Sun = 7,
        _g),
    _f.Data = (_h = class {
        },
        __setFunctionName(_h, "Data"),
        _h.Mon = 1,
        _h.Tue = 2,
        _h.Wed = 3,
        _h.Thr = 4,
        _h.Fri = 5,
        _h.Sat = 6,
        _h.Sun = 7,
        _h),
    _f);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CElastic = void 0;
class CElastic {
    static create(client, indexname, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.indices.create({ index: indexname, body: { settings: payload } });
        });
    }
    static exists(client, indexname) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.indices.exists({ index: indexname });
        });
    }
    static mapping(client, indexname, docType, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.putMapping({ index: indexname, type: docType, body: { properties: payload } });
        });
    }
    static settings(client, indexname, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.putSettings({ index: indexname, body: { settings: payload } });
        });
    }
    static insertDocument(client, indexname, docType, payload, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { index: indexname, type: docType, body: payload };
            if (_id) {
                params.id = _id;
            }
            return yield client.index(params);
        });
    }
    static upsertDocument(client, indexname, docType, payload, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { index: indexname, type: docType, id: _id, body: payload };
            if (_id) {
                params.id = _id;
            }
            return yield client.updateByQuery(params);
        });
    }
    static updateDocument(client, indexname, docType, _id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { index: indexname, type: docType, id: _id, body: payload };
            return yield client.update(params);
        });
    }
    static searchDocument(client, indexname, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.search({ index: indexname, body: payload });
        });
    }
    static deleteDocument(client, indexname, docType, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.delete({ index: indexname, type: docType, id: _id });
        });
    }
    static deleteAll(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.delete({ index: '_all' });
        });
    }
    static analyze(client, indexname, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.analyze({
                index: indexname,
                body: {
                    analyzer: 'standard',
                    text: searchText,
                },
            });
        });
    }
}
exports.CElastic = CElastic;


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CElasticConnect = void 0;
const Elastic = __importStar(__webpack_require__(57));
class CElasticConnect {
    /**
     *
     * node: string | string[];                             the Elasticsearch endpoint to use
     * nodes: string | string[];                            alias of above
     * Connection: typeof Connection;                       custom connection class
     * ConnectionPool: typeof ConnectionPool;               custom connection pool class
     * Transport: typeof Transport;                         custom transport class
     * Serializer: typeof Serializer;                       custom serializer class
     * maxRetries: number;                                  max number of retries for each request
     * requestTimeout: number;                              max request timeout for each request
     * pingTimeout: number;                                 max ping timeout for each request
     * sniffInterval: number;                               perform a sniff operation every `n` milliseconds
     * sniffOnStart: boolean;                               perform a sniff once the client is started
     * sniffEndpoint: string;                               custom sniff endpoint, defaults `_nodes/_all/http`
     * sniffOnConnectionFault: boolean;                     perform a sniff on connection fault
     * resurrectStrategy: 'ping' | 'optimistic' | 'none';   configurethe node resurrection strategy, default `ping`
     * suggestCompression: boolean;                         adds `accept-encoding` header to every request
     * compression: 'gzip';                                 enable gzip request body compression
     * ssl: http.SecureContextOptions;                      ssl configuraton
     * agent: http.AgentOptions;                            http agent options
     * nodeFilter: nodeFilterFn;                            filters which node not to use for a request
     * nodeSelector: nodeSelectorFn | string;               custom selection strategy, defaults `round-robin`
     */
    static create(options) {
        return new Elastic.Client(options);
    }
}
exports.CElasticConnect = CElasticConnect;


/***/ }),
/* 57 */
/***/ ((module) => {

"use strict";
module.exports = require("@elastic/elasticsearch");

/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.healthcheck = void 0;
const v8_1 = __importDefault(__webpack_require__(59));
const healthcheck = () => {
    const processId = process.pid;
    const initialMemory = v8_1.default.getHeapStatistics().total_available_size;
    const usedMemory = process.memoryUsage().rss;
    return {
        processId,
        initialMemory,
        usedMemory,
        status: 'OK',
    };
};
exports.healthcheck = healthcheck;


/***/ }),
/* 59 */
/***/ ((module) => {

"use strict";
module.exports = require("v8");

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.localDatetime = exports.datetime = exports.timestamp = void 0;
const timestamp = () => Math.floor(new Date().getTime() / 1000);
exports.timestamp = timestamp;
const dateFormatter = new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24시간 형식
});
const datetime = () => dateFormatter.format(new Date());
exports.datetime = datetime;
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const localDatetime = () => {
    return formatDate(new Date());
};
exports.localDatetime = localDatetime;


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.strEncoder = exports.getLogger = void 0;
const common_1 = __webpack_require__(4);
const node_buffer_1 = __webpack_require__(62);
function getLogger(loggingPrefix) {
    return new common_1.Logger(loggingPrefix !== null && loggingPrefix !== void 0 ? loggingPrefix : 'Unknown');
}
exports.getLogger = getLogger;
const strEncoder = (str, source_encode = 'utf8', target_encode = 'utf8') => {
    if (source_encode === target_encode)
        return str;
    const buff = node_buffer_1.Buffer.from(str, source_encode);
    return buff.toString(target_encode);
};
exports.strEncoder = strEncoder;


/***/ }),
/* 62 */
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringToJson = exports.objectToJson = exports.toJsonPrint = void 0;
const stream_1 = __webpack_require__(64);
const toJsonPrint = (jsonData, pretty = true) => {
    const readableStream = new stream_1.Readable();
    if (pretty)
        readableStream.push(JSON.stringify(jsonData, null, 2));
    else
        readableStream.push(JSON.stringify(jsonData));
    readableStream.push(null);
    readableStream.pipe(process.stdout);
    readableStream.push('');
};
exports.toJsonPrint = toJsonPrint;
function objectToJson(jsonObject) {
    return JSON.stringify(jsonObject);
}
exports.objectToJson = objectToJson;
const stringToJson = (jsonString) => {
    return JSON.parse(jsonString);
};
exports.stringToJson = stringToJson;


/***/ }),
/* 64 */
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dict = exports.toPairObject = void 0;
function toPairObject(key, value) {
    const result = {};
    result[key] = value;
    return result;
}
exports.toPairObject = toPairObject;
class Dict {
    constructor() {
        this.dict = {};
    }
    set(key, value) {
        this.dict[key] = value;
        return this;
    }
    has(key) {
        return key in this.dict;
    }
    toJson() {
        try {
            return JSON.stringify(this.dict);
        }
        catch (error) {
            console.error(error);
            return '{}';
        }
    }
    get result() {
        return this.dict;
    }
}
exports.Dict = Dict;


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exceptionSQL = exports.evaluateOK = exports.getAssessAffectCount = exports.isDeleteResult = exports.isUpdateResult = exports.isInsertResult = exports.Query = exports.Execute = exports.adtResultSQL = exports.resultSQL = exports.ResultSQL = void 0;
const typeorm_1 = __webpack_require__(39);
const common_1 = __webpack_require__(4);
class DatabaseResponse {
    constructor(data = null, success, message) {
        this.data = data;
        this.success = success;
        this.message = message;
        if (this.data)
            this.assessQueryBuilder(data);
    }
    assessQueryBuilder(data) {
        this.success = evaluateOK(data);
        this.message = this.success ? exports.Query.OK : exports.Query.Fail;
    }
    get hasError() {
        return this.success !== true;
    }
}
exports.ResultSQL = DatabaseResponse;
const resultSQL = (data) => new exports.ResultSQL(data);
exports.resultSQL = resultSQL;
const adtResultSQL = (result) => {
    const dbResponse = new DatabaseResponse();
    dbResponse.data = result;
    dbResponse.success = !!result;
    dbResponse.message = dbResponse.success ? exports.Query.OK : exports.Query.Fail;
    return dbResponse;
};
exports.adtResultSQL = adtResultSQL;
exports.Execute = { OK: true, Fail: false, Error: false };
exports.Query = { OK: 'success', Fail: 'fail', Error: 'exception' };
// B:TypeGuard
function isInsertResult(result) {
    // return result && typeof result.affected === 'number';
    return result instanceof typeorm_1.InsertResult && typeof result.generatedMaps !== 'undefined';
}
exports.isInsertResult = isInsertResult;
function isUpdateResult(result) {
    return result instanceof typeorm_1.UpdateResult && typeof result.affected === 'number';
}
exports.isUpdateResult = isUpdateResult;
function isDeleteResult(result) {
    return result instanceof typeorm_1.DeleteResult && typeof result.affected === 'number';
}
exports.isDeleteResult = isDeleteResult;
// E:TypeGuard
function getAssessAffectCount(result) {
    if (isInsertResult(result)) {
        // from QueryResult.affected <- identifiers: ObjectLiteral[] : because return length
        return result.generatedMaps.length;
    }
    else if (isUpdateResult(result)) {
        return result.affected;
    }
    else if (isDeleteResult(result)) {
        return result.affected;
    }
    else {
        // throw new Error('Invalid result type');
        return 0;
    }
}
exports.getAssessAffectCount = getAssessAffectCount;
function evaluateOK(resultSet) {
    return getAssessAffectCount(resultSet) > 0;
}
exports.evaluateOK = evaluateOK;
function exceptionSQL(text = '', error) {
    common_1.Logger.error(error);
    // throw new HttpException(text, HttpStatus.BAD_REQUEST, ERROR_CODE.INVALID_PASSWORD_ERROR);
    return new exports.ResultSQL(text);
}
exports.exceptionSQL = exceptionSQL;


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OAuthService = void 0;
const common_1 = __webpack_require__(4);
const google_auth_library_1 = __webpack_require__(68);
const verify_apple_id_token_1 = __importDefault(__webpack_require__(69));
const axios_1 = __importDefault(__webpack_require__(70));
//refactoring 필요 2023.10.02
let OAuthService = exports.OAuthService = class OAuthService {
    constructor(client) {
        this.client = client;
    }
    verifyIdToken(token, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const CLIENT_ID = "676232833118-cf0gqqvjbe619ed1653lffmhfqhc5ls3.apps.googleusercontent.com";
            const IOS_CID = "921664553853-tmuuu1ul3cgdqjtb3c6892mopldau2kp.apps.googleusercontent.com";
            const ANDROID_CID = "921664553853-8q4l002ofn1pulbfs8ecvbc1918brths.apps.googleusercontent.com";
            const CLIENT_ID_APP = "com.workpick.orw";
            const AUDIENCE = [CLIENT_ID, IOS_CID, ANDROID_CID];
            try {
                if (provider === "kakao") {
                    const response = yield axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response.data;
                }
                else if (provider === "apple") {
                    const APPLE_CLIENT_ID_APP = "com.workpick.go-to-work";
                    const response = yield (0, verify_apple_id_token_1.default)({
                        idToken: token,
                        clientId: [APPLE_CLIENT_ID_APP],
                    });
                    return response;
                }
                // ID 토큰 검증 및 유효성 확인 1
                const ticket = yield this.client.verifyIdToken({
                    idToken: token,
                    audience: AUDIENCE, // 클라이언트 ID 입력
                });
                // 검증된 토큰의 payload 반환
                return ticket.getPayload();
            }
            catch (error) {
                console.log("error", error);
                // 검증 실패 시 예외 처리
                return null;
                throw new Error("Invalid ID token");
            }
        });
    }
    verifyIdTokenKakao(token, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("provider", provider);
                const response = yield axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // 검증된 토큰의 payload 반환
                return response;
            }
            catch (error) {
                console.log("error", error);
                throw new Error("Invalid ID token");
            }
        });
    }
    //imp_uid로 결제 정보 조회
    certifications(impUid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 인증 토큰 발급 받기
                const getToken = yield (0, axios_1.default)({
                    url: "https://api.iamport.kr/users/getToken",
                    // POST method
                    method: "post",
                    // "Content-Type": "application/json"
                    headers: { "Content-Type": "application/json" },
                    data: {
                        imp_key: "8567101728422754",
                        imp_secret: "O0pT42HLwq07qv2xAB4xVqFAzSpLzE3QQBSyynUNDcUNWYOSd85HawULlDwYwJAyhXmZczg6s0Nc4yX6", // REST API Secret
                    },
                });
                // imp_uid로 포트원 서버에서 결제 정보 조회
                const accessToken = getToken.data.response.access_token;
                // Step 2: Get Certification Information
                const response = yield axios_1.default.get(`https://api.iamport.kr/certifications/${impUid}`, {
                    headers: { Authorization: accessToken },
                });
                const responseData = response.data.response;
                return responseData;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
exports.OAuthService = OAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof google_auth_library_1.OAuth2Client !== "undefined" && google_auth_library_1.OAuth2Client) === "function" ? _a : Object])
], OAuthService);


/***/ }),
/* 68 */
/***/ ((module) => {

"use strict";
module.exports = require("google-auth-library");

/***/ }),
/* 69 */
/***/ ((module) => {

"use strict";
module.exports = require("verify-apple-id-token");

/***/ }),
/* 70 */
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtService = void 0;
const common_1 = __webpack_require__(4);
const jwt_1 = __webpack_require__(72);
const crypto = __importStar(__webpack_require__(73));
let JwtService = exports.JwtService = class JwtService {
    constructor() {
        this.jwtService = new jwt_1.JwtService({
            secret: "workpick12#$", // JWT 시크릿 키로 대체해야 합니다.
        });
        this.SECRET = "workpick12#$";
        this.expiresIn = 7 * 24 * 60 * 60;
    }
    generateToken(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: this.expiresIn,
        });
    }
    getAccessToken(payload) {
        console.log("userId!!!", payload);
        const plainText = new Date().toString();
        const hashed = crypto
            .createHash("sha256")
            .update(plainText)
            .digest("hex");
        //const hashed: string = CryptoUtil.createHash('sha256', 'this.SECRET').update(plainText).digest('hex');
        return hashed;
    }
};
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtService);


/***/ }),
/* 72 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 73 */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KakaoStrategy = void 0;
const passport_1 = __webpack_require__(75);
const passport_kakao_1 = __webpack_require__(76);
const common_1 = __webpack_require__(4);
const axios_1 = __importDefault(__webpack_require__(70));
let KakaoStrategy = exports.KakaoStrategy = class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, "kakao") {
    constructor() {
        super({
            clientID: "4cb0c86183e5505f9159f44ef17f3b01",
            callbackURL: "http://localhost:3000/api/v1/users/kakaoCallback",
        });
    }
    validate(accessToken, refreshToken, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("accessToken", refreshToken, profile);
            try {
                const response = yield axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const kakaoUser = response.data;
                return kakaoUser;
            }
            catch (error) {
                return error;
            }
        });
    }
};
exports.KakaoStrategy = KakaoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KakaoStrategy);


/***/ }),
/* 75 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 76 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-kakao");

/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrmDataSource = void 0;
const config_1 = __webpack_require__(13);
const typeorm_1 = __webpack_require__(36);
const type_defines_1 = __webpack_require__(78);
const common_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(53);
const logger = new common_1.Logger("OrmDataSource");
exports.OrmDataSource = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        logger.debug((0, utils_1.objectToJson)(config));
        logger.debug(`DataSource Load Path : ${__dirname + "/src/entities/*.entity{.ts,.js}"}`);
        const isSchemaSync = config.get("DB_SCHEMA_SYNC") === "true";
        return {
            provide: "DATA_SOURCE",
            type: config.get("DATABASE_TYPE"),
            host: config.get("MYSQL_HOST"),
            port: config.get("MYSQL_PORT"),
            username: config.get("MYSQL_USER"),
            password: config.get("MYSQL_PASSWORD"),
            database: config.get("MYSQL_DATABASE"),
            multipleStatements: true,
            synchronize: isSchemaSync,
            migrationsRun: isSchemaSync,
            autoLoadEntities: true,
            poolSize: 2,
            supportBigNumbers: true,
            extra: {
                connectionLimit: 8,
            },
            reconnect: true,
            reconnectInterval: 300,
            keepConnectionAlive: true,
            wait_timeout: 950,
            retryAttempts: 2,
            retryDelay: 5000,
            timezone: type_defines_1.TimeZone_KR,
            charset: "utf8mb4_unicode_ci",
            logging: "all",
            entities: [__dirname + "/src/entities/*.entity{.ts,.js}"],
            // entities: [...Object.values(ResourceEntity), ...Object.values(MainEntity), ...Object.values(PushEntity)],
        };
    },
});


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * @Auth : GG
 * Convenience bundle of required type definitions
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisReTryCount = exports.TimeZone_KR = void 0;
exports.TimeZone_KR = '+09:00';
exports.RedisReTryCount = 3;


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterModule = void 0;
const core_1 = __webpack_require__(5);
const filter_request_1 = __webpack_require__(80);
exports.FilterModule = [
    {
        provide: core_1.APP_FILTER,
        useClass: filter_request_1.FilterRequest,
    },
];


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterRequest = void 0;
const common_1 = __webpack_require__(4);
let FilterRequest = exports.FilterRequest = class FilterRequest {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
    }
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        response.removeHeader('X-Powered-By');
        this.logger.debug('[FILTER] Before...\nAuthorizationFilter.intercept() extends NestInterceptor');
        return next.handle().pipe();
    }
};
exports.FilterRequest = FilterRequest = __decorate([
    (0, common_1.Injectable)()
], FilterRequest);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(4);
const interceptor_common_1 = __webpack_require__(82);
let AppController = exports.AppController = class AppController {
    constructor() { }
    start() {
        const date = new Date().toLocaleString();
        return { service: "index", value: `Nest.js ${date}` };
    }
    denyFavicon() {
        return { code: 204 };
    }
    healthcheck() { }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "start", null);
__decorate([
    (0, common_1.Get)("/favicon.ico"),
    (0, common_1.HttpCode)(204),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "denyFavicon", null);
__decorate([
    (0, common_1.Get)("/api/v2/healthcheck"),
    (0, common_1.UseInterceptors)(interceptor_common_1.CachedInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "healthcheck", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], AppController);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CachedInterceptor = void 0;
const common_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(23);
const utils_1 = __webpack_require__(53);
/**  @author GG
 *   @description inbound request interceptor
 *
 *   @param context current execution context object
 *   @param next next handler call */
let CachedInterceptor = exports.CachedInterceptor = class CachedInterceptor {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
        this.intercept = (context, next) => {
            const request = context.switchToHttp().getRequest();
            const beginDate = Date.now();
            context.switchToHttp().getResponse().removeHeader('X-Powered-By');
            // this.logger.debug('[RUN] CachedInterceptor(NestInterceptor)@intercept()');
            if (context.switchToHttp().getRequest().url.includes('favicon')) {
                context.switchToHttp().getResponse().status(204);
                /**
                 * todo : 이후 하드코드된 부분을 요청을 동적제어 방식으로 수정 해야함
                 *        white-list, black-list 중 선택 할 것
                 *        상시 차단과 한시적인 특화 차단의 경우를 분리해서 모듈화 할것  */
                this.logger.debug(`blocked -> ${request.url} / ${request.ip}`);
                return (0, rxjs_1.of)(204);
                // throw ForbiddenException;
            }
            /** todo : URL Filter - white-list, black-list 모듈화 할것 */
            if (request.url.includes('healthcheck')) {
                this.logger.debug(`request URL -> ${request.url}`);
                return (0, rxjs_1.of)((0, utils_1.healthcheck)());
            }
            return next.handle().pipe((0, rxjs_1.tap)(() => {
                const rapTime = Date.now() - beginDate;
                if (rapTime > 100) {
                    this.logger.warn(`long request - ${rapTime}ms`);
                }
                else {
                    this.logger.debug(`to complete - ${rapTime}ms`);
                }
            }), (0, rxjs_1.map)((rsData) => {
                if (rsData) {
                    return rsData;
                }
                else {
                    // 표준 응답 구조가 아닌 경우
                    return {
                        status: 200,
                        command: rsData,
                        // failedMessage: 'error message..',
                    };
                }
            }));
        };
    }
};
exports.CachedInterceptor = CachedInterceptor = __decorate([
    (0, common_1.Injectable)()
], CachedInterceptor);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.LoggerMiddleware = void 0;
const common_1 = __webpack_require__(4);
const logger_config_1 = __importDefault(__webpack_require__(7));
let LoggerMiddleware = exports.LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        res.on('finish', () => {
            logger_config_1.default.debug(`[REQ] ${req.ip} ${req.method} ${res.statusCode} : ${req.originalUrl}`);
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterceptorModule = void 0;
const core_1 = __webpack_require__(5);
const interceptor_common_1 = __webpack_require__(82);
exports.InterceptorModule = [
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: interceptor_common_1.CachedInterceptor,
    },
];


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(53);
let HttpExceptionFilter = exports.HttpExceptionFilter = class HttpExceptionFilter {
    /**
     * @description Common HTTP Exception
     *
     * @param exception current exception object
     * @param host ArgumentsHost -> handler & arguments getter
     * (Express : Response, Request, Next )
     */
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception === null ? common_1.HttpStatus.BAD_REQUEST : exception.getStatus();
        const timestamp = (0, utils_1.localDatetime)();
        /** @description HttpException data usage */
        const res = exception.getResponse();
        this.errorPrint(ctx, status, timestamp);
        response.status(status).json({
            status: common_1.HttpStatus.OK === status,
            result: status,
            message: res.message,
            timestamp: timestamp,
        });
    }
    errorPrint(ctx, status, timestamp) {
        const { method, originalUrl, params, query, body, headers } = ctx.getRequest();
        (0, utils_1.toJsonPrint)({
            request: `CODE|${status} METHOD|${method} PATH|${originalUrl}`,
            data: 'GET' === method ? { params: params, query: query } : { params: params, body: body },
            headers: headers,
            timestamp: timestamp,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configDotenv = void 0;
const dotenv_1 = __importDefault(__webpack_require__(87));
const app_root_path_1 = __webpack_require__(10);
const path_1 = __webpack_require__(11);
const logger_config_1 = __importDefault(__webpack_require__(7));
const configDotenv = () => {
    const { NODE_ENV: env } = process.env;
    let envPath = '';
    switch (env) {
        case 'development':
            envPath = (0, path_1.join)(app_root_path_1.path, 'envs', '.env.local');
            break;
        case 'production':
            envPath = (0, path_1.join)(app_root_path_1.path, 'envs', '.env.production');
            break;
        case 'test':
            envPath = (0, path_1.join)(app_root_path_1.path, 'envs', '.env.test');
            break;
        default:
            logger_config_1.default.error(`${env} is not a valid environment`);
            throw new Error();
    }
    dotenv_1.default.config(); // load .env
    dotenv_1.default.config({ path: envPath }); // load .env.{env}
};
exports.configDotenv = configDotenv;


/***/ }),
/* 87 */
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const compression_1 = __importDefault(__webpack_require__(89));
const express_1 = __importDefault(__webpack_require__(90));
//import helmet from 'helmet';
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
//app
//  .use(helmet())
//  .use(helmet.hsts()) // (SSL/TLS-HTTP) 연결을 적용하는 Strict-Transport-Security 헤더를 설정
//  .use(helmet.ieNoOpen()) //IE8 이상에 대해 X-Download-Options를 설정
//  .use(helmet.noSniff()) // X-Content-Type-Options 선언된 콘텐츠 유형으로부터 벗어난 응답에 브라우저의 MIME 가로채기를 방지
//  .use(helmet.xssFilter()) // X-XSS-Protection을 설정하여 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용
//  .use(helmet.hidePoweredBy()); // X-Powered-By 헤더를 제거
// .use(helmet.contentSecurityPolicy())
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
exports["default"] = app;


/***/ }),
/* 89 */
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),
/* 90 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
            const workbook = XLSX.read(file.buffer, {
                type: "buffer",
                cellDates: true,
                dateNF: "yyyy-mm-dd",
            });
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
                console.log("deposit", values[7]);
                if (values.length < 8)
                    return;
                const [month, companyCnt, userCnt, amount, charge, deposit, settlement, amountDay,] = values;
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


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.ExcelRepository !== "undefined" && repositories_1.ExcelRepository) === "function" ? _a : Object])
], ExcelService);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelRepository = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(36);
const typeorm_2 = __webpack_require__(39);
const entities_1 = __webpack_require__(37);
const dt_service_1 = __webpack_require__(98);
let ExcelRepository = exports.ExcelRepository = class ExcelRepository {
    constructor(userRepository, dataSource, dtService) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
        this.dtService = dtService;
    }
};
exports.ExcelRepository = ExcelRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object, typeof (_c = typeof dt_service_1.DtService !== "undefined" && dt_service_1.DtService) === "function" ? _c : Object])
], ExcelRepository);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
/* 99 */
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
            return true;
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
                    //request.headers["accId"] = user.id.toString();
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
/* 101 */
/***/ ((module) => {

"use strict";
module.exports = require("xlsx");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("b509d85b292fb1b090ff")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;