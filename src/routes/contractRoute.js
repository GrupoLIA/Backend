import { Router } from 'express';
import auth from '../middlewares/authentication';
import permit from '../middlewares/authorization';

import contractController from '../controllers/contractController';
import reviewController from '../controllers/reviewController';

const router = new Router();

router
  .route('/')
  .get(auth, permit('user', 'admin'), contractController.getAllContracts)
  .post(auth, contractController.createContract);

router.route('/:contractID').patch(auth, contractController.acceptContract);

router.route('/:contractID/reviews').post(auth, reviewController.createReview);

export default router;
