const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class ExpensesService {
  constructor() {
    this._pool = new Pool();
  }

  async addExpense(payload) {
    const id = `expense-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO expenses VALUES($1, $2, $3, $4, $5, $6, $6) RETURNING id',
      values: [id, ...Object.values(payload), insertedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Expense gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getExpenses() {
    const result = await this._pool.query('SELECT id, category, date, nominal FROM expenses');
    return result.rows;
  }

  async getExpenseById(id) {
    const query = {
      text: 'SELECT * FROM expenses WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Expense tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editExpenseById(id, {
    category, description, date, nominal,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE expenses SET category = $1, description = $2, date = $3, nominal = $4, updated_at = $5 WHERE id = $6 RETURNING id',
      values: [category, description, date, nominal, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui expense. Id tidak ditemukan');
    }
  }

  async deleteExpenseById(id) {
    const query = {
      text: 'DELETE FROM expenses WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Expense gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ExpensesService;
