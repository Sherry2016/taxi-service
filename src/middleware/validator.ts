import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateSchema =
  (joiSchema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
