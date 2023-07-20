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

const loginUser = async (payload: IUser): Promise<IUser | undefined> => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new ApiError(http.NOT_FOUND, 'This email does not exists');
  } else {
    if (user.password == payload.password) {
      return user;
    } else {
      throw new ApiError(http.UNAUTHORIZED, 'Wrong password');
    }
  }
};

const forgotPassword = async (email: string, password: string): Promise<IUser | undefined> => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(http.NOT_FOUND, 'This email does not exists');
  } else {
    await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        password: password,
      },
    );
  }
  return user
};

export const UserService = {
  createUser,
  loginUser,
  forgotPassword,
};
