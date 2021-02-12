import { Router } from 'express';

import reviewController from '../controllers/reviewController';

import auth from '../middlewares/auth';

const router = new Router();

router.route('/').get(auth(false), reviewController.getAllReviews);
router.route('/:contractID').post(auth(false), reviewController.createReview);

export default router;
