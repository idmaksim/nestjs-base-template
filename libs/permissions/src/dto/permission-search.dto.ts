import { PermissionBaseDto } from './permission-base.dto';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { InputType, PartialType, Field } from '@nestjs/graphql';

@InputType()
export class PermissionSortDto {
  @Field(() => SortTypes)
  @IsOptional()
  @IsEnum(SortTypes)
  title?: SortTypes;
}

@InputType()
export class PermissionFiltersDto extends PartialType(PermissionBaseDto) {}

@InputType()
export class PermissionSearchDto extends SearchBaseDto {
  @Field(() => PermissionFiltersDto, { nullable: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionFiltersDto)
  filters?: PermissionFiltersDto;

  @Field(() => PermissionSortDto, { nullable: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionSortDto)
  sorts?: PermissionSortDto;
}
