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

      res.cookie('accessToken', data?.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', data?.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        success: true,
        message: 'Company logged in successfully.',
      });
    } catch (error: any) {
      next(error);
    }
  };
}
