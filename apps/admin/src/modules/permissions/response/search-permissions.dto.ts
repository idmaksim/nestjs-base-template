import { Field, ObjectType } from '@nestjs/graphql';
import { PermissionModel } from '@app/permissions/models/permission.model';

@ObjectType()
export class SearchPermissionsResponseDto {
  @Field(() => [PermissionModel])
  data: PermissionModel[];

  @Field(() => Number)
  count: number;
}
