import Joi from 'joi';

export const hrInviteValidationSchema = Joi.object({
  numOfHRs: Joi.number().min(1).required(),
  hrEmails: Joi.array()
    .items(Joi.string().email().required())
    .min(1)
    .required(),
});
