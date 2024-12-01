import { JwtPayload } from '@app/common/types/jwt-payload';
import { UsersService } from '@app/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      return await this.usersService.findOneById({
        id: payload.id,
        withPassword: false,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
