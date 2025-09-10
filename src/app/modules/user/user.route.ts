import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post(
  '/register-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.post('/login-user', UserControllers.loginUser);

export const UserRoutes = router;
