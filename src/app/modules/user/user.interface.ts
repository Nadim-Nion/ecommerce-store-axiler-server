import { Model } from 'mongoose';

export type TUserRole = 'customer' | 'admin';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export interface UserModelType extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
