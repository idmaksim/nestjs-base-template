import { Controller, Get, Param, UseGuards, Inject } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ActiveGuard } from '@app/common/guards/active.guard';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { PermissionEnum } from '@app/common/constants/permission.enum';
import { PermissionsSummary } from '@app/common/swagger/summary/permissions.summary';
import { HasPermissions } from '@app/common/decorators/permissions.decorator';
import { PERMISSION_SERVICE } from '@app/common/constants/providers.const';
import { PermissionService } from '@app/permissions';

@ApiTags('Permissions')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: PermissionService,
  ) {}

  @Get()
  @HasPermissions(PermissionEnum.PermissionGetAll)
  @ApiOperation({ summary: PermissionsSummary.FIND_ALL })
  async findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @HasPermissions(PermissionEnum.PermissionGet)
  @ApiOperation({ summary: PermissionsSummary.FIND_ONE })
  async findOne(@Param('id') id: string) {
    return this.permissionService.findOneById(id);
  }
}
