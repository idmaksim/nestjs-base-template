import { UserBaseDto } from '@app/users/dto/user-base.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class SignInDto extends UserBaseDto {}
