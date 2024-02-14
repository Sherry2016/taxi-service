import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  if (error instanceof MongooseError) {
    res.status(400).json({ error: 'Bad request' });
  } else {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
};
