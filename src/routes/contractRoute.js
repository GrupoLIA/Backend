import { Router } from 'express';
import auth from '../middlewares/auth';

import contractController from '../controllers/contractController';

const router = new Router();

router
  .route('/')
  .get(contractController.getAllContracts)
  .post(contractController.createContract);

router.route('/:contractID').patch(auth, contractController.acceptContract);

export default router;
