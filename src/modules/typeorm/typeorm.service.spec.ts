import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormEntity } from './entities/typeorm.entity';
import { TypeormService } from './typeorm.service';

describe('TypeormService', () => {
  let service: TypeormService;
  let repository: Repository<TypeormEntity>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          database: ':memory:',
          type: 'better-sqlite3',
          synchronize: true,
          dropSchema: true,
          entities: [TypeormEntity],
        }),
        TypeOrmModule.forFeature([TypeormEntity]),
      ],
      providers: [TypeormService],
    }).compile();

    service = app.get<TypeormService>(TypeormService);
    repository = app.get(getRepositoryToken(TypeormEntity));
  });

  afterEach(async () => {
    await repository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should save one row', async () => {
    await service.create({ label: 'label', value: 'value' });

    const allRows = await repository.find();

    expect(allRows.length).toBe(1);
  });

  it('should to be empty repository', async () => {
    const allRows = await repository.find();

    expect(allRows.length).toBe(0);
  });
});
