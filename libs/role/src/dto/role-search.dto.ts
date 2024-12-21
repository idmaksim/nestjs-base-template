import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RoleBaseDto } from './role-base.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';

export class RoleSortDto {
  @ApiProperty({ enum: SortTypes })
  @IsOptional()
  @IsString()
  name?: SortTypes;
}

export class RoleFiltersDto extends PartialType(RoleBaseDto) {}

export class RoleSearchDto extends SearchBaseDto<RoleFiltersDto, RoleSortDto> {
  @ApiProperty()
  @Type(() => RoleFiltersDto)
  filters?: RoleFiltersDto;

  @ApiProperty()
  @Type(() => RoleSortDto)
  sorts?: RoleSortDto;
}
