import { Router } from 'express';
import auth from '../middlewares/authentication';
import adminController from '../controllers/adminController';
import allow from '../middlewares/authorization';

const router = new Router();

router
  .route('/user/:id')
  .get(auth, allow('admin'), adminController.getUser)
  .patch(auth, allow('admin'), adminController.updateUser)
  .put(auth, allow('admin'), adminController.addTrade);

router.route('/login').post(adminController.login);
router
  .route('/contracts')
  .get(auth, allow('admin'), adminController.getAllContracts);

export default router;
