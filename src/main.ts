import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { AppModule } from './app.module';
import { mainConfig } from './utils/mainConfig';

async function bootstrap() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  mainConfig(app);

  await app.listen(3000);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
