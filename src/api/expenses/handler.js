class ExpensesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postExpenseHandler = this.postExpenseHandler.bind(this);
    this.getExpensesHandler = this.getExpensesHandler.bind(this);
    this.getExpenseByIdHandler = this.getExpenseByIdHandler.bind(this);
    this.putExpenseByIdHandler = this.putExpenseByIdHandler.bind(this);
    this.deleteExpenseByIdHandler = this.deleteExpenseByIdHandler.bind(this);
  }

  async postExpenseHandler(request, h) {
    this._validator.validateExpensePayload(request.payload);

    const expenseId = await this._service.addExpense(
      request.payload,
    );

    const response = h.response({
      status: 'success',
      message: 'Pengeluaran berhasil ditambahkan',
      data: {
        expenseId,
      },
    });
    response.code(201);
    return response;
  }

  async getExpensesHandler() {
    const expenses = await this._service.getExpenses();
    return {
      status: 'success',
      data: {
        expenses,
      },
    };
  }

  async getExpenseByIdHandler(request) {
    const { id } = request.params;
    const expense = await this._service.getExpenseById(id);
    return {
      status: 'success',
      data: {
        expense,
      },
    };
  }

  async putExpenseByIdHandler(request) {
    this._validator.validateExpensePayload(request.payload);
    const { id } = request.params;

    await this._service.editExpenseById(id, request.payload);

    return {
      status: 'success',
      message: 'Expense berhasil diperbarui',
    };
  }

  async deleteExpenseByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteExpenseById(id);
    return {
      status: 'success',
      message: 'Expense berhasil dihapus',
    };
  }
}

module.exports = ExpensesHandler;
