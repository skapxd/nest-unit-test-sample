import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomMongooseModule } from './modules/mongoose/mongoose.module';
import { TypeormModule } from './modules/typeorm/typeorm.module';

@Module({
  imports: [CustomMongooseModule, TypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
