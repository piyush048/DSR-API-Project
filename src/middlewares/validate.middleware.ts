import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import logger from '../utils/logger';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.error('Validation error', error.details);
      res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message)
      });
      return;
    }

    next();
  };
};
