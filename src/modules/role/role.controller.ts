import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ActiveGuard } from '../../common/guards/active.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { HasPermissions } from '../../common/decorators/permissions.decorator';
import { PermissionEnum } from 'src/common/constants/permission.enum';
import { RoleSummary } from 'src/common/swagger/summary/role.summary';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';

@ApiTags('Roles')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HasPermissions(PermissionEnum.RoleCreate)
  @ApiOperation({ summary: RoleSummary.CREATE })
  async create(@Body() roleDto: RoleCreateDto) {
    return this.roleService.create(roleDto);
  }

  @Get(':id')
  @HasPermissions(PermissionEnum.RoleGet)
  @ApiOperation({ summary: RoleSummary.FIND_ONE })
  async findOneById(@Param('id') id: string) {
    return this.roleService.findOneById(id);
  }

  @Get()
  @HasPermissions(
    PermissionEnum.RoleGetAll,
    PermissionEnum.RolePermissionGetAll,
    PermissionEnum.PermissionGetAll,
  )
  @ApiOperation({ summary: RoleSummary.FIND_ALL })
  async findAll() {
    return this.roleService.findAll();
  }

  @Patch(':id')
  @HasPermissions(PermissionEnum.RoleUpdate)
  @ApiOperation({ summary: RoleSummary.UPDATE })
  async update(@Param('id') id: string, @Body() roleDto: RoleUpdateDto) {
    return this.roleService.update(id, roleDto);
  }

  @Delete(':id')
  @HasPermissions(PermissionEnum.RoleDelete)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: RoleSummary.DELETE })
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
