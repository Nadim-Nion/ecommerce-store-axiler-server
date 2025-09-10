import jwt from 'jsonwebtoken';
import { TUserRole } from './user.interface';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    userId: Types.ObjectId;
    email: string;
    role: TUserRole;
  },
  secretKey: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn,
  } as jwt.SignOptions);
};
