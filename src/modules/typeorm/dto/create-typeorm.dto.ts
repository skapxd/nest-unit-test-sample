import { IsString } from '@nestjs/class-validator';

export class CreateTypeormDto {
  @IsString()
  label: any;

  @IsString()
  value: any;
}
