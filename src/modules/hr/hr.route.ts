import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { hrRegValidationSchema } from './hr.validations';
import { HrController } from './hr.controller';

const router = Router();
const hrController = new HrController();

router.post(
  '/register',
  validateRequest(hrRegValidationSchema),
  hrController.registerHr,
);

export default router;
