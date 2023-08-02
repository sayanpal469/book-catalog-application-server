import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import http from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: http.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.loginUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Login successfully',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.forgotPassword(
    req.params.email,
    req.body.password,
  );

  sendResponse<IUser>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Your password is being updated',
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  forgotPassword,
};
