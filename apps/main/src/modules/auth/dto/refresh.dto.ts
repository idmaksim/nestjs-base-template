import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RefreshDto {
  @Field(() => String)
  @IsString()
  refreshToken: string;
}
