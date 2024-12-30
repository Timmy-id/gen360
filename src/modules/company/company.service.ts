import bcrypt from 'bcryptjs';
import { MailerService } from '../../services/mailerService';
import { AppError } from '../../utils';
import { IHRInvite } from '../invite/invite.interface';
import { HRInvite } from '../invite/invite.model';
import { ICompany } from './company.interface';
import { Company } from './company.model';
import { FRONTEND_URL } from '../../config';

export class CompanyService {
  private mailerService;
  constructor() {
    this.mailerService = new MailerService();
  }

  public async register(companyData: ICompany): Promise<ICompany> {
    const companyExist = await Company.findOne({ email: companyData.email });

    if (companyExist) {
      throw new AppError(
        409,
        `Company with email ${companyExist.email} already exist`,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(companyData.password, salt);

    const newCompany = await Company.create({
      ...companyData,
      password: hashPassword,
    });
    return newCompany;
  }
  public async sendInviteToHR(hrData: IHRInvite): Promise<IHRInvite> {
    if (
      !Array.isArray(hrData.hrEmails) ||
      hrData.hrEmails.length !== hrData.numOfHRs
    ) {
      throw new AppError(
        400,
        'Number of HRs does not match number of emails provided',
      );
    }

    const newInvite = await HRInvite.create({
      ...hrData,
      hrEmails: hrData.hrEmails.map((data) => ({
        email: data.email,
        status: 'Pending',
      })),
    });

    for (const hr of hrData.hrEmails) {
      const inviteLink = `${FRONTEND_URL}/companies/hr-invites/accept?email=${hr.email}`;
      const subject = "You're Invited to Join Our Team!";
      const html = `<p>Hi,</p><p>You have been invited to join our company. Click the link below to accept the invitation:</p><p><a href="${inviteLink}">Accept Invitation</a></p>`;
      await this.mailerService.sendMail(hr.email, subject, html);
    }
    return newInvite;
  }

  public async acceptInvite(email: any): Promise<IHRInvite> {
    const hrInvite = await HRInvite.findOne({
      'hrEmails.email': email,
    });

    if (!hrInvite) {
      throw new AppError(400, 'You have not been invited');
    }

    const status = hrInvite.hrEmails[0].status;

    if (status === 'Accepted') {
      throw new AppError(400, 'You have already accepted our invitation');
    }

    hrInvite.hrEmails[0].status = 'Accepted';
    await hrInvite.save();
    const subject = 'You have Accepted to Join Our Team!';
    const html = `<p>Hi,</p><p>You have accepted to join our company.</p>`;
    await this.mailerService.sendMail(email, subject, html);

    return hrInvite;
  }
}
