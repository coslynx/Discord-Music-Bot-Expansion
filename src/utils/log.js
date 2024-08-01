const winston = require('winston');
const chalk = require('chalk');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Define custom log levels
logger.addColors({
  debug: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
  fatal: 'magenta',
});

// Custom logging methods
logger.debug = (message, ...meta) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(chalk.cyan('[DEBUG]'), message, ...meta);
  }
  logger.log('debug', message, ...meta);
};

logger.info = (message, ...meta) => {
  console.log(chalk.green('[INFO]'), message, ...meta);
  logger.log('info', message, ...meta);
};

logger.warn = (message, ...meta) => {
  console.log(chalk.yellow('[WARN]'), message, ...meta);
  logger.log('warn', message, ...meta);
};

logger.error = (message, ...meta) => {
  console.log(chalk.red('[ERROR]'), message, ...meta);
  logger.log('error', message, ...meta);
};

logger.fatal = (message, ...meta) => {
  console.log(chalk.magenta('[FATAL]'), message, ...meta);
  logger.log('fatal', message, ...meta);
};

module.exports = { log: logger };