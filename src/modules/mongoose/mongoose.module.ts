import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongooseController } from './mongoose.controller';
import { MongooseService } from './mongoose.service';
import { MongooseCollection, MongooseSchema } from './schema/mongoose.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        return {
          uri,
        };
      },
    }),
    MongooseModule.forFeature([
      { name: MongooseCollection.name, schema: MongooseSchema },
    ]),
  ],
  controllers: [MongooseController],
  providers: [MongooseService],
})
export class CustomMongooseModule {}
