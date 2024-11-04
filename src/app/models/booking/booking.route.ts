import express from 'express';

import { bookingController } from './booking.controller';

const router = express.Router();
// booking routes
router.post('/create-booking', bookingController.createBooking);

router.get('/', bookingController.getAllBookings);

router.get('/:email', bookingController.getUserBooking);

export const BookingsRoutes = router;
