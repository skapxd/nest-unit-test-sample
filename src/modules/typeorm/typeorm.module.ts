import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.POSTGRES_URL,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [TypeormController],
  providers: [TypeormService],
})
export class TypeormModule {}
