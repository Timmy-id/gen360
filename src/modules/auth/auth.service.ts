import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { AppError, generateToken, verifyToken } from '../../utils';
import { MailerService } from '../../services';
import { Company } from '../company';
import { IAuth } from './auth.interface';
import {
  ACCESS_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_KEY,
} from '../../config';

export class AuthService {
  private mailerService;
  constructor() {
    this.mailerService = new MailerService();
  }

  public async login(
    loginData: IAuth,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const companyExist = await Company.findOne({ email: loginData.email });

    if (!companyExist) {
      throw new AppError(400, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      companyExist.password,
    );

    if (!isPasswordValid) {
      throw new AppError(400, 'Invalid credentials');
    }

    const accessToken = generateToken(
      { id: companyExist._id },
      ACCESS_TOKEN_KEY as string,
      {
        expiresIn: ACCESS_TOKEN_EXPIRESIN,
      },
    );

    const refreshToken = generateToken(
      { id: companyExist._id },
      REFRESH_TOKEN_KEY as string,
      {
        expiresIn: REFRESH_TOKEN_EXPIRESIN,
      },
    );

    companyExist.refreshToken = refreshToken;
    await companyExist.save();

    return { accessToken, refreshToken };
  }

  public async refreshAccessToken(
    refreshToken: string,
  ): Promise<string | null> {
    try {
      const payload = verifyToken(refreshToken, REFRESH_TOKEN_KEY as string);
      const company = await Company.findById(payload);

      if (!company || company.refreshToken !== refreshToken) {
        return null;
      }

      return generateToken({ id: company._id }, ACCESS_TOKEN_KEY as string, {
        expiresIn: ACCESS_TOKEN_EXPIRESIN,
      });
    } catch {
      return null;
    }
  }

  public async logout(companyId: string): Promise<void> {
    const company = await Company.findById(companyId);

    if (company) {
      company.refreshToken = '';
      company.save();
    }
  }
}
