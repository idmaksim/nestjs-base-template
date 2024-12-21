import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  @Field(() => Int)
  @Min(0)
  @IsNumber()
  count: number;

  @Field(() => Int)
  @Min(1)
  @IsNumber()
  page: number;
}
