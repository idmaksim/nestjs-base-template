import { PartialType } from '@nestjs/swagger';
import { RoleBaseDto } from './role-base.dto';
import { IsEnum, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleSortDto {
  @Field(() => SortTypes, { nullable: true })
  @IsOptional()
  @IsEnum(SortTypes)
  name?: SortTypes;
}

@InputType()
export class RoleFiltersDto extends RoleBaseDto {}

@InputType()
export class RoleSearchDto extends SearchBaseDto {
  @Field(() => RoleFiltersDto, { nullable: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RoleFiltersDto)
  filters?: RoleFiltersDto;

  @Field(() => RoleSortDto, { nullable: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RoleSortDto)
  sorts?: RoleSortDto;
}
