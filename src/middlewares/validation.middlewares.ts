import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((err) => err.message);
      res.status(422).json({
        success: false,
        messages: errorDetails,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
      });
    }
    next();
  };
};
