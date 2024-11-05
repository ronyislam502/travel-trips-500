import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TFollower } from './follower.interface';

import { Types } from 'mongoose';

const followUserIntoDB = async (payload: TFollower) => {
  const { user, follower } = payload;

  // Convert string IDs to ObjectId
  const userObjectId = new Types.ObjectId(user);
  const targetedObjectId = new Types.ObjectId(follower);

  const targetedUser = await User.findById(targetedObjectId);
  if (!targetedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isFollowing = targetedUser.followers.includes(userObjectId);

  if (isFollowing) {
    await User.findByIdAndUpdate(userObjectId, {
      $pull: { following: targetedObjectId },
    });
    await User.findByIdAndUpdate(targetedObjectId, {
      $pull: { followers: userObjectId },
    });
    return 'UnFollow successfully';
  } else {
    await User.findByIdAndUpdate(userObjectId, {
      $push: { following: targetedObjectId },
    });
    await User.findByIdAndUpdate(targetedObjectId, {
      $push: { followers: userObjectId },
    });
    return 'Followed successfully';
  }
};

const getFollowersFromDB = async (id: string) => {
  // Find the user by ID and populate the followers field
  const userWithFollowers = await User.findById(id)
    .populate('user', 'name email avatar') // Specify the fields you want from the follower
    .select('followers');

  if (!userWithFollowers) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return userWithFollowers;
};

const getFollowingFromDB = async (id: string) => {
  // Find the user by ID and populate the followers field
  const userWithFollowing = await User.findById(id)
    .populate('user') // Specify the fields you want from the follower
    .select('followers');

  if (!userWithFollowing) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return userWithFollowing;
};

export const FollowerServices = {
  followUserIntoDB,
  getFollowersFromDB,
  getFollowingFromDB,
};
