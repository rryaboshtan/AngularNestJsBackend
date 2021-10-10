import { Injectable } from '@nestjs/common';
import { Admin } from './admin.model';


@Injectable()
export class UsersService {
  private readonly users: Admin[] = [
    {
      id: 1,
      username: 'roman',
      password: 'secret',
    },
    {
      id: 2,
      username: 'mambo',
      password: 'dumbo',
    },
  ];

  async findOne(username: string): Promise<Admin | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
