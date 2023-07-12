import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import fetchToCurl from 'fetch-to-curl';

import { Env } from '#/src/utils/env';

@Catch()
export class AllExceptionsHandler extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsHandler.name);

  constructor(@Inject(HttpAdapterHost) applicationRef: HttpServer) {
    super(applicationRef);
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { url, method, headers, body } = request;

    try {
      const status =
        exception instanceof HttpException ? exception.getStatus() : 500;
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception.message;

      const log = {
        status,
        cURL: fetchToCurl(`${Env.urlBack}/${url}`, {
          body,
          headers,
          method,
        }),
        headers,
        body,
        url,
        method,
        errorMessage: message,
      };

      this.logger.error(log);

      if (!Env.isDev) {
        return response.status(500).json({ error: 'ocurrió un error' });
      }

      return response.status(status).json(log);
    } catch (error) {
      if (Env.isDev)
        return response
          .status(500)
          .json(new InternalServerErrorException(error.message).getResponse());

      return response.status(500).json({
        statusCode: 400,
        message: 'Bad Request',
        error: 'Bad Request',
      });
    }
  }
}
