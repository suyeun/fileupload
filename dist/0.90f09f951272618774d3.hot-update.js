"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 89:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrmDataSource = void 0;
const config_1 = __webpack_require__(13);
const typeorm_1 = __webpack_require__(36);
const type_defines_1 = __webpack_require__(90);
const common_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(54);
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3a0af4569799cb7df6ac")
/******/ })();
/******/ 
/******/ }
;