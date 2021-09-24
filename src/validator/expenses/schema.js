const Joi = require('joi');

const ExpensePayloadSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.string().required(),
  nominal: Joi.number().integer().required(),
});

module.exports = { ExpensePayloadSchema };
