import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { mainConfig } from '#/src/utils/mainConfig';

import { TypeormEntity } from './entities/typeorm.entity';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';

describe('TypeormController', () => {
  let app: INestApplication;
  let repository: Repository<TypeormEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [TypeormController],
      providers: [TypeormService],
    }).compile();

    repository = module.get(getRepositoryToken(TypeormEntity));

    app = module.createNestApplication();

    mainConfig(app);

    await app.init();
  });

  afterEach(async () => {
    await repository.clear();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return status 412, body is not valid dto', async () => {
    const resp = await request(app.getHttpServer())
      .post('/typeorm')
      .send({ title: 'Title' })
      .set('Accept', 'application/json');

    expect(resp.status).toBe(412);
  });

  it('should return status 201, body is valid dto', async () => {
    const resp = await request(app.getHttpServer())
      .post('/typeorm')
      .send({ label: 'Label', value: 'Value' })
      .set('Accept', 'application/json');

    expect(resp.status).toBe(201);

    const allRows = await repository.find();

    expect(allRows.length).toBe(1);
  });
});
