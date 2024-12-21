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
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export abstract class BasePermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: PermissionService,
    private readonly i18n: I18nService,
  ) {}

  abstract getRequest(context: ExecutionContext);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >('permissions', [context.getHandler(), context.getClass()]);
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    const { user }: { user: User } = await this.getRequest(context);
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

@Injectable()
export class PermissionGuard extends BasePermissionGuard {
  async getRequest(context: ExecutionContext): Promise<Request> {
    return context.switchToHttp().getRequest();
  }
}

@Injectable()
export class PermissionGuardGraphql extends BasePermissionGuard {
  async getRequest(context: ExecutionContext): Promise<Request> {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
