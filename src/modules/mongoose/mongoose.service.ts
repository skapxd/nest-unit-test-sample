import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMongooseDto } from './dto/create-mongoose.dto';
import { UpdateMongooseDto } from './dto/update-mongoose.dto';
import { MongooseCollection, MongooseDocument } from './schema/mongoose.entity';

@Injectable()
export class MongooseService {
  constructor(
    @InjectModel(MongooseCollection.name)
    private readonly model: Model<MongooseDocument>,
  ) {}

  async create(createMongooseDto: CreateMongooseDto) {
    await this.model.create(createMongooseDto);
  }

  async findAll() {
    return await this.model.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} mongoose`;
  }

  update(id: number, updateMongooseDto: UpdateMongooseDto) {
    return `This action updates a #${id} mongoose`;
  }

  remove(id: number) {
    return `This action removes a #${id} mongoose`;
  }
}
