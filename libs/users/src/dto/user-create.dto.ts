import { UserBaseDto } from './user-base.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateDto extends UserBaseDto {}
