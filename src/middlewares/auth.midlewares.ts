import { Request, Response, NextFunction } from 'express';
import { AppError, verifyToken } from '../utils';
import { ACCESS_TOKEN_KEY } from '../config';

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError(401, 'Invalid access token');
  }

  try {
    const payload = verifyToken(accessToken, ACCESS_TOKEN_KEY as string);
    req.user = payload;
    next();
  } catch (error: any) {
    next(error);
  }
};
