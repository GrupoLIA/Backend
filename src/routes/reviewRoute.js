import { Router } from 'express';

import reviewController from '../controllers/reviewController';

import auth from '../middlewares/auth';

const router = new Router();

router.route('/').get(auth, reviewController.getAllReviews);
router.route('/:contractID').post(auth, reviewController.createReview);

//router.route('/:').get(auth, reviewController.);
export default router;
