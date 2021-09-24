class ExpensesService {
  constructor() {
    this._expenses = [];
  }

  getExpenses() {
    return this._expenses;
  }
}

module.exports = ExpensesService;
