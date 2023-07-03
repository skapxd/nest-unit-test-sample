import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormEntity2 } from './entities/typeorm.entity';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';

describe('TypeormController', () => {
  let controller: TypeormController;
  let repository: Repository<TypeormEntity2>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          database: ':memory:',
          type: 'better-sqlite3',
          synchronize: true,
          dropSchema: true,
          entities: [TypeormEntity2],
        }),
        TypeOrmModule.forFeature([TypeormEntity2]),
      ],
      controllers: [TypeormController],
      providers: [TypeormService],
    }).compile();

    controller = app.get<TypeormController>(TypeormController);
    repository = app.get(getRepositoryToken(TypeormEntity2));
  });

  afterEach(async () => {
    await repository.clear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should save one row', async () => {
    await controller.create({ label: 'label', value: 'value' });

    const allRows = await repository.find();

    expect(allRows.length).toBe(1);
  });

  it('should to be empty repository', async () => {
    const allRows = await repository.find();

    expect(allRows.length).toBe(0);
  });
});