import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoleBaseDto {
  @ApiProperty()
  @IsString()
  name: string;
}
