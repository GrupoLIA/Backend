import { Router } from 'express';
import auth from '../middlewares/auth';

import contractController from '../controllers/contractController';
import reviewController from '../controllers/reviewController';

const router = new Router();

router
  .route('/')
  .get(auth(false), contractController.getAllContracts)
  .post(auth(false), contractController.createContract);

router.route('/:contractID').patch(auth(false), contractController.acceptContract);

router.route('/:contractID/reviews').post(auth(false), reviewController.createReview);

export default router;
