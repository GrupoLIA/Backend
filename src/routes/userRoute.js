import { Router } from 'express';

import userController from '../controllers/userController';
import reviewController from '../controllers/reviewController';
import auth from '../middlewares/auth';

const router = new Router();

router.route('/').get(userController.getAllUsers);
router.route('/signin').post(userController.signIn);
router.route('/signup').post(userController.signUp);
router.route('/profile').get(auth(false), userController.readProfile);
router.route('/logout').post(auth(false), userController.logout); //Admin cant logout
router.route('/:userID/reviews').get(reviewController.getAllReviews);

router.route('/admin/update/:id').patch(auth(true), userController.adminUpdateUser);

export default router;
