import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUserLogin) => {
  const { email, password } = payload;

  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, 'User is not found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExists.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(status.NOT_FOUND, 'User is not matched');
  }

  // Access granted and send access token to the client
  const jwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

  return {
    accessToken,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
