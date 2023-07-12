import { ConsoleLogger } from '@nestjs/common';

import { logModel } from './Log.model';

export class CustomLogger extends ConsoleLogger {
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.log(message, context, ...rest);
  }

  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    const log = {
      errorMessage: message,
    };

    logModel.create(log);

    super.error(message, stack, context, ...rest);
  }

  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.warn(message, context, ...rest);
  }

  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.debug(message, context, ...rest);
  }

  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.verbose(message, context, ...rest);
  }
}
