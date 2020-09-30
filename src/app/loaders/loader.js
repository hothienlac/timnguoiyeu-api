const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

const log = require('log');

const loader = () => {
  // Load EXPRESS
  const app = expressLoader();

  // Load MONGOOSE
  mongooseLoader.connect()
      .then((connection) => {
        log.info(`MongoDB connected: ${connection.toString()}`);
      })
      .catch((err) => {
        log.error(err);
      });

  log.info('Server Initialized');
  return app;
};

module.exports = loader;
