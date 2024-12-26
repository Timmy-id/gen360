import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorHandler, NotFoundError } from './middlewares';

export const App = async () => {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());

  //   app.use('/api/v1/menus', menuRoutes);
  //   app.use('/api/v1/tables', tableRoutes);
  //   app.use('/api/v1/auth', authRoutes);
  //   app.use('/api/v1/orders', orderRoutes);

  app.use(NotFoundError);
  app.use(ErrorHandler);

  return app;
};
