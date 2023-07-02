import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomMongooseModule } from './modules/mongoose/mongoose.module';

@Module({
  imports: [CustomMongooseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
