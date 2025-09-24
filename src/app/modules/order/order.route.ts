import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES_OBJ } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLES_OBJ.customer),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', OrderControllers.getAllOrders);

router.get('/:orderId',auth(USER_ROLES_OBJ.customer), OrderControllers.getSingleOrder);

router.patch('/:orderId',auth(USER_ROLES_OBJ.customer), OrderControllers.updateOrder);

router.delete('/:orderId', auth(USER_ROLES_OBJ.customer), OrderControllers.deleteOrder)

export const OrderRoutes = router;
