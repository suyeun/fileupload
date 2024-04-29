import dotenv from 'dotenv';
import { path } from 'app-root-path';
import { join } from 'path';

import logger from './logger.config';

export const configDotenv = () => {
  const { NODE_ENV: env } = process.env;
  let envPath = '';

  switch (env) {
    case 'development':
      envPath = join(path, 'envs', '.env.local');
      break;

    case 'production':
      envPath = join(path, 'envs', '.env.production');
      break;

    case 'test':
      envPath = join(path, 'envs', '.env.test');
      break;

    default:
      logger.error(`${env} is not a valid environment`);
      throw new Error();
  }

  dotenv.config(); // load .env
  dotenv.config({ path: envPath }); // load .env.{env}
};
