import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ILogger } from '../../application/providers/ILogger';

const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ timestamp, level, message, stack, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} ${level}: ${stack || message}${metaString}`;
});

function createWinstonInstance(): Logger {
  const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [
      new transports.Console({
        format: combine(colorize({ all: true }), logFormat),
        handleExceptions: true,
      }),

      new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        level: 'info',
      }),
      new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '30d',
        level: 'error',
      }),
    ],
    exitOnError: false,
  });

  return logger;
}

export class WinstonLogger implements ILogger {
  private logger: Logger;

  constructor() {
    this.logger = createWinstonInstance();
  }

  info(message: string, meta?: Record<string, any>) {
    this.logger.info(message, meta);
  }
  warn(message: string, meta?: Record<string, any>) {
    this.logger.warn(message, meta);
  }
  error(message: string, meta?: Record<string, any>) {
    this.logger.error(message, meta);
  }
  debug(message: string, meta?: Record<string, any>) {
    this.logger.debug(message, meta);
  }
}
