import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PermissionService } from '@app/permissions';
import { RoleRepository } from './role.repository';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';
import { PERMISSION_SERVICE } from '@app/common/constants/providers.const';
import { RoleUpdateOptions } from './interfaces/service.interfaces';
import { RoleSearchDto } from './dto/role-search.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly i18n: I18nService,
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: PermissionService,
  ) {}

  async delete(id: string) {
    await this.ensureExistsById(id);
    return this.roleRepository.delete(id);
  }

  async search(dto: RoleSearchDto) {
    const [roles, count] = await Promise.all([
      this.roleRepository.search(dto),
      this.roleRepository.count(dto),
    ]);
    if (!roles.length) {
      throw new NotFoundException(this.i18n.t('errors.role.notFoundMany'));
    }
    return {
      data: roles,
      count,
    };
  }

  async update(options: RoleUpdateOptions) {
    if (options.dto.permissions.length) {
      await Promise.all(
        options.dto.permissions.map((permission) =>
          this.permissionService.ensureExistsById(permission),
        ),
      );
    }
    await this.ensureExistsById(options.id);
    return this.roleRepository.update(options);
  }

  async create(dto: RoleCreateDto) {
    if (dto.permissions.length) {
      await Promise.all(
        dto.permissions.map((permission) =>
          this.permissionService.ensureExistsById(permission),
        ),
      );
    }
    return this.roleRepository.create(dto);
  }

  async findOneById(id: string) {
    const role = await this.roleRepository.findOneById(id);
    if (!role) {
      throw new NotFoundException(this.i18n.t('errors.role.notFound'));
    }
    return role;
  }

  async ensureExistsById(id: string) {
    const exists = await this.roleRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.role.notFound'));
    }
  }
}
