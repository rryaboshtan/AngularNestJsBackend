import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', //configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    // const user = await this.authService.validateUser(username, password);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    //   return user;

    return {
      id: payload.id,
    };
  }
}
