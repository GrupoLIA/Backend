import { Router } from 'express';
import auth from '../middlewares/authentication';
import adminController from '../controllers/adminController';
import permit from '../middlewares/authorization';

const router = new Router();

router
  .route('/user/:id')
  .get(auth, permit('admin'), adminController.getUser)
  .patch(auth, permit('admin'), adminController.updateUser)
  .put(auth, permit('admin'), adminController.addTrade);

router.route('/login').post(adminController.login);

export default router;
