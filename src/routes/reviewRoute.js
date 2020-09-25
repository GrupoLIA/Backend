import { Router } from 'express';

import reviewController from '../controllers/reviewController';

import auth from '../middlewares/auth';

const router = new Router();

router.route('/').get(reviewController.getAllReviews);

router.route('/:contractID').post(auth, reviewController.createReview);
export default router;
