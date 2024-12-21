import { Resolver } from '@nestjs/graphql';
import { UsersService as LibUsersService } from '@app/users';
import { UserModel } from '@app/users/models/user.model';
import {
  ActiveGuard,
  DecodeUserGraphql,
  JwtAuthGuardGraphql,
} from '@app/common';
import { User } from '@app/common/types/user';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserModel)
@UseGuards(JwtAuthGuardGraphql)
export class UsersResolver {
  constructor(private readonly libService: LibUsersService) {}

  @Query(() => UserModel)
  async me(@DecodeUserGraphql() user: User) {
    return user;
  }
}
