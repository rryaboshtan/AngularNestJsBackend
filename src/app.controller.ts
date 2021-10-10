import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    // return req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  getProfile(@Request() req): any {
    return req.user;
    
    // return this.authService.login(req.user);
  }

  // @Get('protected')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
