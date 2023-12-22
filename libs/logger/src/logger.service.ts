import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Injectable()
export class LoggerService {
  logger = new Logger();

  setContext(context: string) {
    this.logger.error(context);
  }

  log(message: string, context?: any) {
    Logger.log(message, JSON.stringify(context));
  }

  error(message: string, trace?: string, context?: any) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(new Error(`Message: ${message}; Stack trace: ${trace}`));
    }
    Logger.error(message, trace, JSON.stringify(context));
  }

  warn(message: string, context?: any) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(new Error(`Message: ${message};`));
    }
    Logger.warn(message, JSON.stringify(context));
  }

  debug(message: string, context?: any) {
    Logger.debug(message, JSON.stringify(context));
  }

  verbose(message: string, context?: any) {
    Logger.verbose(message, JSON.stringify(context));
  }
}
