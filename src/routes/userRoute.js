import { Router } from 'express';
import userController from '../controllers/userController';
import reviewController from '../controllers/reviewController';
import auth from '../middlewares/authentication';

const router = new Router();

router.route('/').get(userController.getAllUsers);
router.route('/signin').post(userController.signIn);
router.route('/signup').post(userController.signUp);
router.route('/profile').get(auth, userController.readProfile);
router.route('/logout').post(auth, userController.logout);
router.route('/:userID/reviews').get(reviewController.getAllReviews);

export default router;
