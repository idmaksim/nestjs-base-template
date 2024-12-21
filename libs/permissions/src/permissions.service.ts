import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from './permissions.repository';
import { I18nService } from 'nestjs-i18n';
import { CheckPermissionOptions } from './interfaces/service.interfaces';
import { PermissionSearchDto } from './dto/permission-search.dto';

@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);

  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly i18n: I18nService,
  ) {}

  async search(dto: PermissionSearchDto) {
    const [permissions, count] = await Promise.all([
      this.permissionRepository.search(dto),
      this.permissionRepository.count(dto),
    ]);

    return {
      data: permissions,
      count,
    };
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

  async checkPermission(options: CheckPermissionOptions) {
    const rolePermissions = await this.permissionRepository.findManyByRoleId(
      options.roleId,
    );
    return rolePermissions.some(
      (rolePermission) => rolePermission.name === options.permission,
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
