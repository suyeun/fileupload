"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmDataSource = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const type_defines_1 = require("../domains/shared/type.defines");
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const logger = new common_1.Logger("OrmDataSource");
exports.OrmDataSource = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        logger.debug((0, utils_1.objectToJson)(config));
        logger.debug(`DataSourceLoadPath: ${__dirname + "/src/entities/*.entity{.ts,.js}"}`);
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
            synchronize: true,
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
//# sourceMappingURL=typeorm.config.js.map