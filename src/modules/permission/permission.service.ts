import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);

  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll() {
    const permissions = await this.permissionRepository.findAll();
    if (!permissions.length) {
      this.logger.error(`Права не найдены`);
      throw new NotFoundException(
        this.i18n.t('errors.permission.not_found_many'),
      );
    }
    this.logger.log(`Права найдены: ${permissions.length}`);
    return permissions;
  }

  async findOneById(id: string) {
    const permission = await this.permissionRepository.findOneById(id);
    if (!permission) {
      this.logger.error(`Право ${id} не найдено`);
      throw new NotFoundException(this.i18n.t('errors.permission.not_found'));
    }
    this.logger.log(`Право ${permission.name} найдено`);
    return permission;
  }

  async checkPermission(permission: string, roleId: string) {
    const rolePermissions =
      await this.permissionRepository.findManyByRoleId(roleId);
    return rolePermissions.some(
      (rolePermission) => rolePermission.name === permission,
    );
  }

  async ensureExistsById(id: string) {
    const exists = await this.permissionRepository.existsById(id);
    if (!exists) {
      this.logger.error(`Право ${id} не найдено`);
      throw new NotFoundException(this.i18n.t('errors.permission.notFound'));
    }
  }
}
