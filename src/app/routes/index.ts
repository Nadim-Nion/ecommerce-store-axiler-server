import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);

export default router;

/* 
router.use(path, route)
router.use('/user', UserRoutes)
router.use('/student', StudentRoutes)
*/
