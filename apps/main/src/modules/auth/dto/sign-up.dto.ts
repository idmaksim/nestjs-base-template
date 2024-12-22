import { UserCreateDto } from '@app/users/dto/user-create.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class SignUpDto extends UserCreateDto {}
