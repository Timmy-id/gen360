import { Request, Response, NextFunction } from 'express';
import { HrService } from './hr.service';

export class HrController {
  public hrService = new HrService();

  public registerHr = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const hrData = req.body;
      const hr = await this.hrService.signup(hrData);

      res.status(201).json({
        success: true,
        message: 'HR created successfully.',
        data: hr,
      });
    } catch (error: any) {
      next(error);
    }
  };
}
