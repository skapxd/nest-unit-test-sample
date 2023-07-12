import { IsString } from '@nestjs/class-validator';

export class CreateMongooseDto {
  @IsString()
  readonly label: any;

  @IsString()
  readonly value: any;
}
