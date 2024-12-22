import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsSemVer, IsString } from 'class-validator';
import { RoleBaseDto } from './role-base.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleCreateDto extends RoleBaseDto {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
