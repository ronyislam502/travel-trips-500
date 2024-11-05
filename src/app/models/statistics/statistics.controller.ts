import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { StatisticsServices } from './statistics.service';

const statistics = catchAsync(async (req, res) => {
  const result = await StatisticsServices.getStatisticsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Statistics retrieved successfully',
    data: result,
  });
});

export const StatisticsControllers = {
  statistics,
};
