import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.userZodSchema),
  UserController.createUser
);

// router.get('/users', UserController.getUser);
// router.get('/users/:id', UserController.getSingelUser);
// router.patch('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

export const UserRoutes = router;
