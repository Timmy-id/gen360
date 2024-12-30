import bcrypt from 'bcryptjs';
import { AppError, generateToken } from '../../utils';
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
      companyExist.id,
      ACCESS_TOKEN_KEY as string,
      {
        expiresIn: ACCESS_TOKEN_EXPIRESIN,
      },
    );

    const refreshToken = generateToken(
      companyExist.id,
      REFRESH_TOKEN_KEY as string,
      {
        expiresIn: REFRESH_TOKEN_EXPIRESIN,
      },
    );

    companyExist.refreshTokens?.push(refreshToken);
    await companyExist.save();

    return { accessToken, refreshToken };
  }

  public async refreshAccessToken(refreshToken: string): Promise<string | null> {

  }
}
