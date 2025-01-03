import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { companyRegValidationSchema } from './company.validations';
import { CompanyController } from './company.controller';

const router = Router();
const companyController = new CompanyController();

router.post(
  '/register',
  validateRequest(companyRegValidationSchema),
  companyController.registerCompany,
);

router.post('/hr-invites', auth, companyController.sendInviteToHr);
router.get('/hr-invites/accept', companyController.acceptInvite);

export default router;
