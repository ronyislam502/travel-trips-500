import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/success', PaymentControllers.successPaymentController);

router.post('/fail', PaymentControllers.failedPaymentController);

router.get('/fail', PaymentControllers.failedPaymentController);

export const PaymentRoutes = router;
