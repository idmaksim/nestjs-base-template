import { PermissionService } from '@app/permissions';
import { PermissionModel } from '@app/permissions/models/permission.model';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => PermissionModel)
export class PermissionsResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => PermissionModel)
  async permissions() {
    return this.permissionService.search({});
  }
}
