import { Resolver } from '@nestjs/graphql';
import { RoleModel } from '@app/role/models/role.model';
import { RoleService } from '@app/role';
import { Args, Query } from '@nestjs/graphql';

@Resolver(() => RoleModel)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => RoleModel)
  async role(@Args('id') id: string) {
    return this.roleService.findOneById(id);
  }
}
