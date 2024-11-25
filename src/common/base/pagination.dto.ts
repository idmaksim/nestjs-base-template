import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 10 })
  @Min(0)
  @IsNumber()
  count: number;

  @ApiProperty({ default: 1 })
  @Min(1)
  @IsNumber()
  page: number;
}
