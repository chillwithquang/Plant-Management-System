const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

const MONGODB_URL =
  config.env === 'production'
    ? 'mongodb+srv://admin:admin@plantsmanagementsystem.i3grx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    : config.mongoose.url;

logger.info(`@@mongodb ${MONGODB_URL}`);

mongoose.connect(MONGODB_URL, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

require('./seed');

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
