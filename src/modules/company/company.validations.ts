import Joi from 'joi';

export const companyRegValidationSchema = Joi.object({
  companyName: Joi.string().required().messages({
    'string.empty': 'Company Name cannot be empty',
    'any.required': 'Company Name is required',
  }),
  cacRegNo: Joi.number().required().messages({
    'number.empty': 'CAC Registration Number cannot be empty',
    'any.required': 'CAC Registration Number is required',
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
  numEmployees: Joi.number().messages({
    'number.empty': 'Number of employees cannot be empty',
  }),
});
