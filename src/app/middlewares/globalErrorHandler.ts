import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../types/common';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import handelValidationError from '../../errors/handelValidationError';
import handelZodError from '../../errors/ZodError';
import ApiError from '../../errors/ApiError';
import config from '../../config';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // res.status(400).json({
  //   error: err
  // })
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err instanceof mongoose.Error.ValidationError) {
    // console.log(err)
    const simplifiedError = handelValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    console.log(err.message);
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
