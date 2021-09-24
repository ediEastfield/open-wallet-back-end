const ExpensesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'expenses',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const expensesHandler = new ExpensesHandler(service, validator);
    server.route(routes(expensesHandler));
  },
};
