/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.const';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  role: 'admin' | 'user';
  status: 'basic' | 'premium';
  address?: string;
  image: string;
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
