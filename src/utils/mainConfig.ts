import { ValidationError } from '@nestjs/class-validator';
import {
  INestApplication,
  PreconditionFailedException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionsHandler } from '#/src/AllExceptionsHandler/AllExceptionsHandler';

import { Env } from './env';
import { CustomLogger } from './logger';

export function mainConfig(app: INestApplication) {
  app.useLogger(new CustomLogger());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new PreconditionFailedException(validationErrors);
      },
    }),
  );

  const httpRef = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsHandler(httpRef.httpAdapter.getHttpServer()),
  );

  if (Env.nodeEnv === 'test') return;
  const { SwaggerTheme } = require('swagger-themes');

  const theme = new SwaggerTheme('v3');

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config, {});

  SwaggerModule.setup('api', app, document, {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  });
}
