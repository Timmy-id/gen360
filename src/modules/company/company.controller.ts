import { Request, Response, NextFunction } from 'express';
import { CompanyService } from './company.service';

export class CompanyController {
  public companyService = new CompanyService();

  public registerCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const companyData = req.body;
      const company = await this.companyService.register(companyData);

      res.status(201).json({
        success: true,
        message: 'Company created successfully.',
        data: company,
      });
    } catch (error: any) {
      next(error);
    }
  };
}
