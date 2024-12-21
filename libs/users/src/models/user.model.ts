import { RoleModel } from '@app/role/models/role.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => RoleModel)
  role: RoleModel;
}
