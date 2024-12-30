import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { loginValidationSchema } from './auth.validations';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authController.loginCompany,
);

export default router;
