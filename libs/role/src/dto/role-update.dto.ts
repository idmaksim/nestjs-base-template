import { RoleCreateDto } from './role-create.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RoleUpdateDto extends RoleCreateDto {}
