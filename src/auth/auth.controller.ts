import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Connection, Repository } from 'typeorm';
import { Admin } from 'src/modules/admin/model/admin.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private adminRepository: Repository<Admin>;

  constructor(
    private authService: AuthService,
    private connection: Connection) {
    this.adminRepository = this.connection.getRepository(Admin);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any): any {
    // return req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any): any {
    return req.user;
    // return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const adminId = await this.adminRepository.findOne(req.user.id);
    // return req.user;
    return this.authService.login(adminId);
  }
  // @Get('protected')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
