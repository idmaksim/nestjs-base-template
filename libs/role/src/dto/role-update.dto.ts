import { PartialType } from '@nestjs/swagger';
import { RoleCreateDto } from './role-create.dto';

export class RoleUpdateDto extends PartialType(RoleCreateDto) {}
