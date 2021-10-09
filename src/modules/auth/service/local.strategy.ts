import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'auth') {
   constructor(private authService: AuthService) {
      super({
          usernameField: 'login',
          
      });
   }

   async validate(login: string, password: string): Promise<any> {
      const admin = await this.authService.validateAdmin(login, password);

      if (!admin) {
         throw new UnauthorizedException();
      } else {
         return admin;
      }
   }
}