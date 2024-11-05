import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { FollowerServices } from './follower.service';

const followByUser = catchAsync(async (req, res) => {
  const result = await FollowerServices.followUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'follow successfully',
    data: result,
  });
});

const getFollowers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FollowerServices.getFollowersFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'followers retrieved successfully',
    data: result,
  });
});

const getFollowings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FollowerServices.getFollowingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'followers retrieved successfully',
    data: result,
  });
});

export const FollowerControllers = {
  followByUser,
  getFollowers,
  getFollowings,
};
