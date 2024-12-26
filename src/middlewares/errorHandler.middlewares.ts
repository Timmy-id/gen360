// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError, logger } from '../utils';

export const NotFoundError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const err = new AppError(404, `Not Found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};

export const ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  try {
    let statusCode: number = err.statusCode ?? 500;
    let message = err.message || 'Something went wrong';

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`,
    );

    if (err.name === 'CastError') {
      statusCode = 404;
      message = 'Resource not found';
    }

    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  } catch (error) {
    next(err);
  }
};
