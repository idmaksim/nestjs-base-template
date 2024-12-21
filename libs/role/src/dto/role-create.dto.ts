import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsSemVer, IsString } from 'class-validator';
import { RoleBaseDto } from './role-base.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RoleCreateDto extends RoleBaseDto {
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
