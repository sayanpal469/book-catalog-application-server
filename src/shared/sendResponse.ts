import { Response } from 'express';
import { IApiResponse } from '../types/common';

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const resData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
