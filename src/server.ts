import http from 'http';
import { App } from './app';
import { connectDB, logger } from './utils';
import { PORT } from './config';

const initializeApp = async () => {
  const app = await App();
  const server = http.createServer(app);

  (async () => {
    try {
      await connectDB();
    } catch (error) {
      logger.error(`${error}`);
    }
  })();

  server.listen(PORT, () => {
    logger.info('============================');
    logger.info(`App listening on port ${PORT}`);
    logger.info('============================');
  });
};

initializeApp();
