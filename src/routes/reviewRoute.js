import { Router } from 'express';

import reviewController from '../controllers/reviewController';

const router = new Router();

router.route('/').get(reviewController.getAllReviews);

router.route('/:contractID').post(reviewController.createReview);
export default router;
