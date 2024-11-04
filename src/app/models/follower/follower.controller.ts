import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { FollowerServices } from './follower.service';

const followByUser = catchAsync(async (req, res) => {
  const result = await FollowerServices.followByUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'follow successfully',
    data: result,
  });
});

const unFollowByUser = catchAsync(async (req, res) => {
  const result = await FollowerServices.unFollowByUserFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'follow successfully',
    data: result,
  });
});

export const FollowerControllers = {
  followByUser,
  unFollowByUser,
};
