import { Injectable } from '@nestjs/common';
import { Admin } from 'src/modules/admin/model/admin.entity';

@Injectable()
export class UsersService {
  private readonly users: Admin[] = [
    
  ];

  async findOne(username: string): Promise<Admin | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async find(id: number): Promise<Admin | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
