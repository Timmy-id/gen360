import nodemailer from 'nodemailer';
import { EMAIL_PASS, EMAIL_USER } from '../config';
import { AppError } from '../utils';

export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new AppError(400, 'Failed to send email');
    }
  }
}
