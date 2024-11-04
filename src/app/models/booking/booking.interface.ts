import { Types } from 'mongoose';

export type TBooking = {
  user: Types.ObjectId;
  tran_id: string;
  status: string;
  amount: string;
  tran_id: string;
};

export type TBookingRequest = {
  amount: string;
  status: string;
};
