import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  ORIGIN,
  LOG_FORMAT,
  LOG_DIR,
  EMAIL_USER,
  EMAIL_PASS,
  SERVICE,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN,
  REDIS_URL,
  SERVER_URL,
  LOCAL_SERVER_URL,
  FRONTEND_URL,
  CLOUD_NAME,
} = process.env;

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
