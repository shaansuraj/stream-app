import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(), // Use JSON format for logs
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log
        new winston.transports.File({ filename: 'combined.log' }), // Log all messages to combined.log
      ],
    });

    // If not in production, log to console with a simple format
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(), // Use simple format for console logs
        }),
      );
    }
  }

  /**
   * Log an info message
   * @param message - The message to log
   */
  log(message: string) {
    this.logger.info(message);
  }

  /**
   * Log an error message
   * @param message - The error message to log
   * @param trace - The stack trace
   */
  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  /**
   * Log a warning message
   * @param message - The warning message to log
   */
  warn(message: string) {
    this.logger.warn(message);
  }

  /**
   * Log a debug message
   * @param message - The debug message to log
   */
  debug(message: string) {
    this.logger.debug(message);
  }

  /**
   * Log a verbose message
   * @param message - The verbose message to log
   */
  verbose(message: string) {
    this.logger.verbose(message);
  }
}