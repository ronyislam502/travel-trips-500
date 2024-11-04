import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TFollower } from './follower.interface';
import { Follower } from './follwer.model';

const followByUserIntoDB = async (payload: TFollower) => {
  const isUserExists = await User.findById(payload.user);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isFollowerExists = isUserExists.followers;

  if (!isFollowerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'follower not found');
  }
  const result = await Follower.create(payload);

  return result;
};

const unFollowByUserFromDB = async (payload: TFollower) => {
  const isUserExists = await User.findById(payload.user);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isFollowerExists = isUserExists.followers;

  if (!isFollowerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'follower not found');
  }

  const result = await Follower.findByIdAndUpdate(payload);

  return result;
};

export const FollowerServices = {
  followByUserIntoDB,
  unFollowByUserFromDB,
};
