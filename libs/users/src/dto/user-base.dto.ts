import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class UserBaseDto {
  @ApiProperty({ example: 'string@gmail.com' })
  @Field(() => String)
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field(() => String)
  @IsString()
  password: string;
}
