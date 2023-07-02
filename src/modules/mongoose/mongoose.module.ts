import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseController } from './mongoose.controller';
import { MongooseService } from './mongoose.service';
import { MongooseCollection, MongooseSchema } from './schema/mongoose.entity';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      { name: MongooseCollection.name, schema: MongooseSchema },
    ]),
  ],
  controllers: [MongooseController],
  providers: [MongooseService],
})
export class CustomMongooseModule {}
