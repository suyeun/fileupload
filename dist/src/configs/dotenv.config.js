"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDotenv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_root_path_1 = require("app-root-path");
const path_1 = require("path");
const logger_config_1 = __importDefault(require("./logger.config"));
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
//# sourceMappingURL=dotenv.config.js.map