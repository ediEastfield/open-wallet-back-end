require('dotenv').config();

const Hapi = require('@hapi/hapi');

// expenses
const expenses = require('./api/expenses');
const ClientError = require('./exceptions/ClientError');
const ExpensesService = require('./services/postgres/ExpensesService');
const ExpensesValidator = require('./validator/expenses');

const init = async () => {
  const expensesService = new ExpensesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  await server.register({
    plugin: expenses,
    options: {
      service: expensesService,
      validator: ExpensesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
