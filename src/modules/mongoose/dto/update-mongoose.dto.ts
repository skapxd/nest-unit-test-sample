import { PartialType } from '@nestjs/mapped-types';

import { CreateMongooseDto } from './create-mongoose.dto';

export class UpdateMongooseDto extends PartialType(CreateMongooseDto) {}
