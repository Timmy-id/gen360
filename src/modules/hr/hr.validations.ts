import Joi from 'joi';

export const hrRegValidationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First Name cannot be empty',
    'any.required': `"firstName" field is required`,
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last Name cannot be empty',
    'any.required': 'Last Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min.base': 'Password should not be less than 8 characters',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone numeber cannot be empty',
    'any.required': 'Phone numeber is required',
  }),
});
