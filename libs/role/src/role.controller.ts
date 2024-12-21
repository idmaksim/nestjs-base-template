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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';
import { HasPermissions } from '@app/common';
import { PermissionEnum } from '@app/common';
import { ActiveGuard, JwtAuthGuard } from '@app/common';
import { PermissionGuard } from '@app/common';
import { RolesSummary } from '@app/common/swagger/summary/roles.summary';
import { RoleSearchDto } from './dto/role-search.dto';

@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HasPermissions(PermissionEnum.RoleCreate)
  @ApiOperation({ summary: RolesSummary.CREATE })
  async create(@Body() roleDto: RoleCreateDto) {
    return this.roleService.create(roleDto);
  }

  @Post('search')
  @HasPermissions(PermissionEnum.RoleSearch)
  @ApiOperation({ summary: RolesSummary.SEARCH })
  async search(@Body() dto: RoleSearchDto) {
    return this.roleService.search(dto);
  }

  @Get(':id')
  @HasPermissions(PermissionEnum.RoleGet)
  @ApiOperation({ summary: RolesSummary.FIND_ONE })
  async findOneById(@Param('id') id: string) {
    return this.roleService.findOneById(id);
  }

  @Patch(':id')
  @HasPermissions(PermissionEnum.RoleUpdate)
  @ApiOperation({ summary: RolesSummary.UPDATE })
  async update(@Param('id') id: string, @Body() dto: RoleUpdateDto) {
    return this.roleService.update({
      id,
      dto,
    });
  }

  @Delete(':id')
  @HasPermissions(PermissionEnum.RoleDelete)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: RolesSummary.DELETE })
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
