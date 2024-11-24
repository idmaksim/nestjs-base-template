import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ActiveGuard } from '../../common/guards/active.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { HasPermissions } from '../../common/decorators/permissions.decorator';
import { PermissionEnum } from 'src/common/constants/permission.enum';
import { PermissionSummary } from 'src/common/swagger/summary/permission.summary';

@ApiTags('Permissions')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @HasPermissions(PermissionEnum.PermissionGetAll)
  @ApiOperation({ summary: PermissionSummary.FIND_ALL })
  async findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @HasPermissions(PermissionEnum.PermissionGet)
  @ApiOperation({ summary: PermissionSummary.FIND_ONE })
  async findOne(@Param('id') id: string) {
    return this.permissionService.findOneById(id);
  }
}
