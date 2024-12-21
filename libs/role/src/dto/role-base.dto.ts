import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RoleBaseDto {
  @Field(() => String)
  @IsString()
  name: string;
}
