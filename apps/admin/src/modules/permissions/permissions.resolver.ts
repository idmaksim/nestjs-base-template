import { PERMISSION_SERVICE } from '@app/common/constants/providers.const';
import { PermissionService } from '@app/permissions';
import { PermissionSearchDto } from '@app/permissions/dto/permission-search.dto';
import { PermissionModel } from '@app/permissions/models/permission.model';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchPermissionsResponseDto } from './response/search-permissions.dto';
import {
  ActiveGuardGraphql,
  HasPermissions,
  JwtAuthGuardGraphql,
  PermissionEnum,
  PermissionGuardGraphql,
} from '@app/common';

@Resolver(() => PermissionModel)
@UseGuards(JwtAuthGuardGraphql, ActiveGuardGraphql, PermissionGuardGraphql)
export class PermissionsResolver {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: PermissionService,
  ) {}

  @Query(() => SearchPermissionsResponseDto, { name: 'permissions' })
  @HasPermissions(PermissionEnum.PermissionSearch)
  async search(@Args('search') search: PermissionSearchDto) {
    return this.permissionService.search(search);
  }
}
