import { Router } from 'express';

import userController from '../controllers/userController';
import auth from '../middlewares/auth';

const router = new Router();

router.route('/').get(userController.getAllUsers);
router.route('/signin').post(userController.signIn);
router.route('/signup').post(userController.signUp);

export default router;
