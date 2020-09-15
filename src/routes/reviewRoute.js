import { Router } from 'express';

import reviewController from '../routesControllers/reviewController';

const router = new Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

export default router;
