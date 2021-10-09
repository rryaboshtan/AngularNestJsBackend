import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/modules/admin/model/admin';
// import { AppService } from './app.service';

@Controller('auth')
export class AuthController {
   @UseGuards(AuthGuard('local'))
   @Post('login')
   async login(@Request() req): Promise<Admin> {
      return req.admin;
   }
}
