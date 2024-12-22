import { RoleModel } from '@app/role/models/role.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchRolesResponseDto {
  @Field(() => [RoleModel])
  data: RoleModel[];

  @Field(() => Number)
  count: number;
}
