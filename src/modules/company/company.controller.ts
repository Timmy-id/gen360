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

  public sendInviteToHr = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const inviteData = req.body;
      const invite = await this.companyService.sendInviteToHR(inviteData);

      res.status(201).json({
        success: true,
        message: 'Invitation sent successfully.',
        data: invite,
      });
    } catch (error: any) {
      next(error);
    }
  };

  public acceptInvite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.query;
      await this.companyService.acceptInvite(email);

      res.status(200).json({
        success: true,
        message: 'Invitation accepted successfully.',
      });
    } catch (error: any) {
      next(error);
    }
  };
}
