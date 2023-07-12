import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import * as request from 'supertest';

import { mainConfig } from '#/src/utils/mainConfig';

import { MongooseController } from './mongoose.controller';
import { MongooseService } from './mongoose.service';
import { MongooseCollection, MongooseSchema } from './schema/mongoose.entity';

describe('MongooseController', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let model: Model<MongooseCollection>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    model = mongoConnection.model(MongooseCollection.name, MongooseSchema);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: MongooseCollection.name, schema: MongooseSchema },
        ]),
      ],
      controllers: [MongooseController],
      providers: [MongooseService],
    }).compile();

    app = module.createNestApplication();

    mainConfig(app);

    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should return status 412, body is not valid dto', async () => {
    const resp = await request(app.getHttpServer())
      .post('/mongoose')
      .send({ title: 'Title' })
      .set('Accept', 'application/json');

    expect(resp.status).toBe(412);
  });

  it('should return status 201, body is valid dto', async () => {
    const resp = await request(app.getHttpServer())
      .post('/mongoose')
      .send({ label: 'Label', value: 'Value' })
      .set('Accept', 'application/json');

    expect(resp.status).toBe(201);

    const allRows = await model.find();

    expect(allRows.length).toBe(1);
  });
});
