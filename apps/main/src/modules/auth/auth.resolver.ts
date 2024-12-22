import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthResponseDto } from './response/auth-response.dto';

@Resolver(() => AuthResponseDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  async signUp(@Args('dto') dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Query(() => AuthResponseDto)
  async signIn(@Args('dto') dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Query(() => AuthResponseDto)
  async refresh(@Args('dto') dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
