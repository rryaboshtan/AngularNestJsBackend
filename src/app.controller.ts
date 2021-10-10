import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

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

  @UseGuards(LocalAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const adminId = await this.usersService.find(req.user.id);
    // return req.user;
    return this.authService.login(adminId);
  }

  // @Get('protected')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
