import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    // return req.user;
    return this.authService.login(req.user);
  }

  // @Get('protected')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
