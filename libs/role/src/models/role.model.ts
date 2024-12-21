import { RolePermissionModel } from '@app/permissions/models/role-permission.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@app/common/models/base.model';

@ObjectType()
export class RoleModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [RolePermissionModel])
  rolePermissions: RolePermissionModel[];
}
