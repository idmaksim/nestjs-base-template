import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsObject, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { Type } from 'class-transformer';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchBaseDto {
  @Field(() => PaginationDto, { nullable: true })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsObject()
  @IsOptional()
  pagination?: PaginationDto;
}
