import { Mutation, Resolver } from '@nestjs/graphql';
import { RoleModel } from '@app/role/models/role.model';
import { RoleService } from '@app/role';
import { Args, Query } from '@nestjs/graphql';
import { SearchRolesResponseDto } from './response/search-roles.dto';
import { RoleSearchDto } from '@app/role/dto/role-search.dto';
import { RoleCreateDto } from '@app/role/dto/role-create.dto';
import { RoleUpdateDto } from '@app/role/dto/role-update.dto';

@Resolver(() => RoleModel)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => RoleModel)
  async role(@Args('id') id: string) {
    return this.roleService.findOneById(id);
  }

  @Query(() => SearchRolesResponseDto)
  async roles(@Args('search') search: RoleSearchDto) {
    return this.roleService.search(search);
  }

  @Mutation(() => RoleModel)
  async createRole(@Args('input') input: RoleCreateDto) {
    return this.roleService.create(input);
  }

  @Mutation(() => RoleModel)
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: RoleUpdateDto,
  ) {
    return this.roleService.update({ id, dto: input });
  }

  @Mutation(() => RoleModel)
  async deleteRole(@Args('id') id: string) {
    return this.roleService.delete(id);
  }
}
