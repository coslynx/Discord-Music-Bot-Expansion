const { log } = require('./log');

/**
 * Handles errors gracefully and logs them to the console.
 *
 * @param {Error} error The error object to handle.
 */
const errorHandler = (error) => {
  log.error(error.message);
  if (error.stack) {
    log.error(error.stack);
  }
};

module.exports = { errorHandler };