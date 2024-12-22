import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(dto);
    await this.authService.setTokenCookie(res, tokens.refreshToken);
    return res.json(tokens);
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    const tokens = await this.authService.signUp(dto);
    await this.authService.setTokenCookie(res, tokens.refreshToken);
    return res.json(tokens);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto, @Res() res: Response) {
    const tokens = await this.authService.refresh(dto.refreshToken);
    await this.authService.setTokenCookie(res, tokens.refreshToken);
    return res.json(tokens);
  }

  @Post('sign-out')
  async signOut(@Res() res: Response) {
    res.clearCookie('refreshToken');
    return res.sendStatus(HttpStatus.OK);
  }
}
