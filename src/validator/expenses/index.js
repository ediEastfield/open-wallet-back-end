const { ExpensePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExpensesValidator = {
  validateExpensePayload: (payload) => {
    const validationResult = ExpensePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExpensesValidator;
