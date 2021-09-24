const routes = (handler) => [
  {
    method: 'POST',
    path: '/expenses',
    handler: handler.postExpenseHandler,
  },
  {
    method: 'GET',
    path: '/expenses',
    handler: handler.getExpensesHandler,
  },
  {
    method: 'GET',
    path: '/expenses/{id}',
    handler: handler.getExpenseByIdHandler,
  },
  {
    method: 'PUT',
    path: '/expenses/{id}',
    handler: handler.putExpenseByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/expenses/{id}',
    handler: handler.deleteExpenseByIdHandler,
  },
];

module.exports = routes;
