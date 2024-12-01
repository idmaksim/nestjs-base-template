import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { User } from '../types/user';
import { PermissionEnum } from '../constants/permission.enum';
import { PermissionService } from 'libs/permissions/src';
import { PERMISSION_SERVICE } from '../constants/providers.const';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: PermissionService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >('permissions', [context.getHandler(), context.getClass()]);
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    const { user }: { user: User } = context.switchToHttp().getRequest();
    const hasAllPermissions = await this.hasPermissions(
      requiredPermissions,
      user.roleId,
    );
    if (!hasAllPermissions) {
      throw new ForbiddenException(this.i18n.t('errors.accessDenied'));
    }
    return true;
  }

  private async hasPermissions(
    requiredPermissions: PermissionEnum[],
    roleId: string,
  ): Promise<boolean> {
    const permissionsCheckResults = await Promise.all(
      requiredPermissions.map((permission) =>
        this.permissionService.checkPermission({ permission, roleId }),
      ),
    );
    return permissionsCheckResults.every((result) => result);
  }
}
