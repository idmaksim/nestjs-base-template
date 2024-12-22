import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseDto {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
