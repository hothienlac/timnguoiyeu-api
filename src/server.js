const loaders = require('app').loaders;
const config = require('configuration').server;
const log = require('log');

/**
 * Listener for Starting server, just log if the server is ready or not
 * @param {ERROR} err error if exist
 */
function listen(err) {
  if (err) {
    log.error(err);
    return;
  };
  log.info(`Your server is ready !`);
}

/**
 * API Server
 */
class Server {
  /**
   * No parameter required
   */
  constructor() {
    this.server = loaders();
    this.port = process.env.PORT || config.port || 3000;
  };

  /**
   * Run this method to start server
   */
  start() {
    this.server.listen(this.port, listen());
  };
}

module.exports = Server;
