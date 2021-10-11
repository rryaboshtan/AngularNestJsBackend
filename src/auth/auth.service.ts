import { Injectable } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/modules/admin/model/admin.entity';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private adminRepository: Repository<Admin>;

  constructor(private jwtService: JwtService, private connection: Connection) {
    this.adminRepository = this.connection.getRepository(Admin);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Admin | null> {
    const user = await this.adminRepository.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
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
