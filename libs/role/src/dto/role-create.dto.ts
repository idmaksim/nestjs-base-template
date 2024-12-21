import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { RoleBaseDto } from './role-base.dto';

export class RoleCreateDto extends RoleBaseDto {
  @ApiProperty()
  @IsArray()
  permissions: string[];
}
