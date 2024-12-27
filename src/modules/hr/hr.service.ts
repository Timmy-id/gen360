import { AppError } from '../../utils';
import { IHr } from './hr.interface';
import { Hr } from './hr.model';

export class HrService {
  public async signup(hrData: IHr): Promise<IHr> {
    const hrExist = await Hr.findOne({ email: hrData.email });

    if (hrExist) {
      throw new AppError(409, `HR with email ${hrExist.email} already exist`);
    }

    const newHr = await Hr.create(hrData);
    return newHr;
  }
}
