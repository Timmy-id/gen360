import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  public authService = new AuthService();

  public loginCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const loginData = req.body;
      const data = await this.authService.login(loginData);

      res.status(200).json({
        success: true,
        message: 'Company logged in successfully.',
        data,
      });
    } catch (error: any) {
      next(error);
    }
  };
}
