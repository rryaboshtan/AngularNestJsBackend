import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
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
