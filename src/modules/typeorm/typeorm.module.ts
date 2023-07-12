import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormEntity } from './entities/typeorm.entity';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: ':memory:',
      type: 'better-sqlite3',
      entities: [],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TypeormEntity]),
  ],
  controllers: [TypeormController],
  providers: [TypeormService],
})
export class TypeormModule {}
