import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DATA_SOURCE_TYPE, TimeZone_KR } from "../domains/shared/type.defines";
import { Logger } from "@nestjs/common";
import { objectToJson } from "../utils";

const logger = new Logger("OrmDataSource");

export const OrmDataSource = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    logger.debug(objectToJson(config));
    logger.debug(
      `DataSourceLoadPath: ${__dirname + "/src/entities/*.entity{.ts,.js}"}`
    );
    const isSchemaSync = config.get<string>("DB_SCHEMA_SYNC") === "true";

    return {
      provide: "DATA_SOURCE",
      type: config.get<DATA_SOURCE_TYPE>("DATABASE_TYPE"),
      host: config.get<string>("MYSQL_HOST"),
      port: config.get<number>("MYSQL_PORT"),
      username: config.get<string>("MYSQL_USER"),
      password: config.get<string>("MYSQL_PASSWORD"),
      database: config.get<string>("MYSQL_DATABASE"),
      multipleStatements: true, // multiple statement queries, result array
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
      retryDelay: 5000, // ms
      timezone: TimeZone_KR,
      charset: "utf8mb4_unicode_ci",
      logging: "all",
      entities: [__dirname + "/src/entities/*.entity{.ts,.js}"],
      // entities: [...Object.values(ResourceEntity), ...Object.values(MainEntity), ...Object.values(PushEntity)],
    };
  },
});
