import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    tran_id: z.string(),
    status: z.enum(['pending', 'completed', 'cancelled']),
  }),
});

export const BookingValidations = {
  bookingValidationSchema,
};
