import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { ErrorHandler, NotFoundError } from './middlewares';
import hrRoutes from './modules/hr';
import companyRoutes from './modules/company';
import authRoutes from './modules/auth';

export const App = async () => {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use('/api/v1/hr', hrRoutes);
  app.use('/api/v1/companies', companyRoutes);
  app.use('/api/v1/auth', authRoutes);

  app.use(NotFoundError);
  app.use(ErrorHandler);

  return app;
};
