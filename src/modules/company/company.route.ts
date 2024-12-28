import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { companyRegValidationSchema } from './company.validations';
import { CompanyController } from './company.controller';

const router = Router();
const companyController = new CompanyController();

router.post(
  '/register',
  validateRequest(companyRegValidationSchema),
  companyController.registerCompany,
);

export default router;
