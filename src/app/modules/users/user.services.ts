import http from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const user = await User.create(payload);
  if (!user) {
    throw new ApiError(http.BAD_REQUEST, 'User not created');
  }

  return user;
};

export const UserService = {
  createUser,
};
