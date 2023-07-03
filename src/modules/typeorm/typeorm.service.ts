import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTypeormDto } from './dto/create-typeorm.dto';
import { UpdateTypeormDto } from './dto/update-typeorm.dto';
import { TypeormEntity } from './entities/typeorm.entity';

@Injectable()
export class TypeormService {
  constructor(
    @InjectRepository(TypeormEntity)
    private usersRepository: Repository<TypeormEntity>,
  ) {}

  async create(createTypeormDto: CreateTypeormDto) {
    await this.usersRepository.save(createTypeormDto);
    const all = await this.usersRepository.find();
    return;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} typeorm`;
  }

  update(id: number, updateTypeormDto: UpdateTypeormDto) {
    return `This action updates a #${id} typeorm`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeorm`;
  }
}
