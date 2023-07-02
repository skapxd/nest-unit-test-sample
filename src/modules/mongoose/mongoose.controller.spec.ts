import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { MongooseController } from './mongoose.controller';
import { MongooseService } from './mongoose.service';
import { MongooseCollection, MongooseSchema } from './schema/mongoose.entity';

describe('MongooseController', () => {
  let controller: MongooseController;
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

    controller = module.get<MongooseController>(MongooseController);
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
    expect(controller).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should create one document', async () => {
    await controller.create({ label: 'label', value: 'value' });
    const documents = await model.find();

    expect(documents.length).toBe(1);
  });
});
