import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder
);

export const OrderRoutes = router;
