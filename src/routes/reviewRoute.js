import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import auth from '../middlewares/authentication';

const router = new Router();

router.route('/:userID').get(auth, reviewController.getAllReviews);
router.route('/:contractID').post(auth, reviewController.createReview);

export default router;
