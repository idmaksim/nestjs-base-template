import { Field, ObjectType } from '@nestjs/graphql';
import { RolePermissionModel } from './role-permission.model';
import { BaseModel } from '@app/common/models/base.model';

@ObjectType()
export class PermissionModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  title: string;

  @Field(() => [RolePermissionModel])
  rolePermissions: RolePermissionModel[];
}
