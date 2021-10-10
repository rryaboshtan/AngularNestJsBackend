import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/modules/admin/model/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<Admin | null> {
    const user = await this.usersService.findOne(username);

    if (user?.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { name: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
