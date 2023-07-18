import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage, IGenericErrorResponse } from '../types/common';

const handelZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Error',
    errorMessages: errors,
  };
};

export default handelZodError;
