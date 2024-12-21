import { RoleModel } from '@app/role/models/role.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { PermissionModel } from './permission.model';
import { BaseModel } from '@app/common/models/base.model';

@ObjectType()
export class RolePermissionModel extends BaseModel {
  @Field(() => RoleModel)
  role: RoleModel;

  @Field(() => PermissionModel)
  permission: PermissionModel;
}
