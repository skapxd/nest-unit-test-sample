import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
