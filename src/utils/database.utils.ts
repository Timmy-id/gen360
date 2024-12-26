import { connect, set } from 'mongoose';
import { DATABASE_URL } from '../config';
import { logger } from './logger.utils';

const db: string = `${DATABASE_URL as string}`;

export const connectDB = async () => {
  try {
    set('strictQuery', false);
    await connect(db);
    logger.info('==== Database Connected ====');
    logger.info(`============================`);
  } catch (err: any) {
    logger.error(err.message);
    process.exit(1);
  }
};
