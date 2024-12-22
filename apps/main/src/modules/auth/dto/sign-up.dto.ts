import { UserCreateDto } from '@app/users/dto/user-create.dto';
import { InputType } from '@nestjs/graphql';

export class SignUpDto extends UserCreateDto {}
