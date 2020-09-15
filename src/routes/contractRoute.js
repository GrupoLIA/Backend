import { Router } from 'express';

import contractController from '../routesControllers/contractController';

const router = new Router();

router
  .route('/')
  .get(contractController.getAllContracts)
  .post(contractController.createContract);

export default router;
