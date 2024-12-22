import { Mutation, Resolver } from '@nestjs/graphql';
import { RoleModel } from '@app/role/models/role.model';
import { RoleService } from '@app/role';
import { Args, Query } from '@nestjs/graphql';
import { SearchRolesResponseDto } from './response/search-roles.dto';
import { RoleSearchDto } from '@app/role/dto/role-search.dto';
import { RoleCreateDto } from '@app/role/dto/role-create.dto';
import { RoleUpdateDto } from '@app/role/dto/role-update.dto';
import { UseGuards } from '@nestjs/common';
import {
  ActiveGuardGraphql,
  HasPermissions,
  JwtAuthGuardGraphql,
  PermissionEnum,
  PermissionGuardGraphql,
} from '@app/common';

@Resolver(() => RoleModel)
@UseGuards(JwtAuthGuardGraphql, ActiveGuardGraphql, PermissionGuardGraphql)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => RoleModel)
  @HasPermissions(PermissionEnum.RoleGet)
  async role(@Args('id') id: string) {
    return this.roleService.findOneById(id);
  }

  @Query(() => SearchRolesResponseDto)
  @HasPermissions(PermissionEnum.RoleSearch)
  async roles(@Args('search') search: RoleSearchDto) {
    return this.roleService.search(search);
  }

  @Mutation(() => RoleModel)
  @HasPermissions(PermissionEnum.RoleCreate)
  async createRole(@Args('dto') dto: RoleCreateDto) {
    return this.roleService.create(dto);
  }

  @Mutation(() => RoleModel)
  @HasPermissions(PermissionEnum.RoleUpdate)
  async updateRole(@Args('id') id: string, @Args('dto') dto: RoleUpdateDto) {
    return this.roleService.update({ id, dto });
  }

  @Mutation(() => RoleModel)
  @HasPermissions(PermissionEnum.RoleDelete)
  async deleteRole(@Args('id') id: string) {
    return this.roleService.delete(id);
  }
}
