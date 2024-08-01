const moment = require('moment');

/**
 * Formats a time duration in milliseconds to a string in the format "HH:mm:ss".
 *
 * @param {number} milliseconds The time duration in milliseconds.
 * @returns {string} The formatted time string.
 */
const formatTime = (milliseconds) => {
  return moment.duration(milliseconds).format('HH:mm:ss');
};

module.exports = { formatTime };