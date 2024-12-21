import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PermissionModel {
  @Field(() => String)
  id: string;
}
