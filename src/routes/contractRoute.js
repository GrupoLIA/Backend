import { Router } from 'express';
import auth from '../middlewares/auth';

import contractController from '../controllers/contractController';
import reviewController from '../controllers/reviewController';

const router = new Router();

router
  .route('/')
  .get(contractController.getAllContracts)
  .post(contractController.createContract);

router.route('/:contractID').patch(auth, contractController.acceptContract);

router.route('/:contractID/reviews').post(auth, reviewController.createReview);

export default router;
