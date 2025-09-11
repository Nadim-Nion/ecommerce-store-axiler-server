import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES_OBJ } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLES_OBJ.admin),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);

router.get(
  '/:productId',
  auth(USER_ROLES_OBJ.admin),
  ProductControllers.getSingleProduct,
);

router.patch(
  '/:productId',
  auth(USER_ROLES_OBJ.admin),
  ProductControllers.updateProduct,
);

router.delete(
  '/:productId',
  auth(USER_ROLES_OBJ.admin),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = router;
