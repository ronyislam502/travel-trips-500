import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { transactionId } from '../../utilities/utils';
import { initiatePayment } from '../payment/payment.utils';

const createBookingIntoDB = async (payload: TBooking) => {
  //   console.log(bookingData)
  const user = await User.findById(payload.user);
  if (!user) {
    throw new Error('User not found');
  }

  const paymentData = {
    transactionId: transactionId,
    amount: payload.amount,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    paidStatus: 'booked',
  };

  const payment = await initiatePayment(paymentData);

  const newBookingData: Partial<TBooking> = {
    user: user.id,
    tran_id: transactionId,
    status: 'pending',
  };

  await Booking.create(newBookingData);

  return payment;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find();
  return result;
};

const getUserBookingFromDB = async (email: string) => {
  const result = await Booking.findOne({ email }).populate('user');

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getUserBookingFromDB,
  getAllBookingsFromDB,
};
