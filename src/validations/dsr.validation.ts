import Joi, { date } from 'joi';

export const createDsrSchema = Joi.object({
    date: Joi.date().iso().required().messages({
      'date.base': 'Date must be a valid date',
      'any.required': 'Date is required',    
    }),
  content: Joi.string().trim().min(5).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least 5 characters',
  }),
  hours: Joi.number().min(1).max(8).required().messages({
    'number.base': 'Hours must be a number',
    'number.min': 'Minimum 1 hour required',
    'number.max': 'Cannot exceed 8 hours',
    'any.required': 'Hours are required',
  }),
});

export const updateDsrSchema = Joi.object({
  id: Joi.number().required(),
  content: Joi.string().trim().min(5).optional(),
  hours: Joi.number().min(1).max(8).optional(),
  date: Joi.date().iso().optional(),
});
