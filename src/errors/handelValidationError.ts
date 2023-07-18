import mongoose from 'mongoose';
import http from 'http-status-codes';
import { IGenericErrorMessage, IGenericErrorResponse } from '../types/common';

const handelValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    element => {
      return {
        path: element?.path,
        message: element?.message,
      };
    },
  );

  const statusCode = http.BAD_REQUEST;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handelValidationError;
