import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { BookingServices } from './booking.service';
import sendResponse from '../../utilities/sendResponse';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings  successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await BookingServices.getUserBookingFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getUserBooking,
};
