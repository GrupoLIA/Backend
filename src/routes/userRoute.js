import { Router } from 'express';

import userController from '../routesControllers/userController';

const router = new Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default router;
