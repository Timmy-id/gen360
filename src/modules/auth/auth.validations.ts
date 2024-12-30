import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Invalid credentials',
    'any.required': 'Invalid credentials',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min.base': 'Invalid credentials',
    'string.empty': 'Invalid credentials',
    'any.required': 'Invalid credentials',
  }),
});
