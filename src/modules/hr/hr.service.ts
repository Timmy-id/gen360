import { AppError } from '../../utils';
import { HRInvite } from '../invite/invite.model';
import { IHr } from './hr.interface';
import { Hr } from './hr.model';

export class HrService {
  public async signup(hrData: IHr): Promise<IHr> {
    const hrInvited = await HRInvite.findOne({
      'hrEmails.email': hrData.email,
    });

    if (!hrInvited) {
      throw new AppError(400, 'You have not been invited to sign up');
    }

    let status = '';

    hrInvited.hrEmails.forEach((hr) => {
      status += hr.status;
    });

    if (status !== 'Accepted') {
      throw new AppError(400, 'You are yet to accept the invite');
    }

    const hrExist = await Hr.findOne({ email: hrData.email });

    if (hrExist) {
      throw new AppError(409, `HR with email ${hrExist.email} already exist`);
    }

    const newHr = await Hr.create(hrData);
    return newHr;
  }
}
