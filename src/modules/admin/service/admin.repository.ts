import { Injectable } from '@nestjs/common';
import { Admin } from '../model/admin';

@Injectable()
export class AdminRepository {
   constructor() {
      this.admins = [
         {
            id: 1,
            login: 'roman',
            password: 'secret',
         },
      ];
   }

   private readonly admins: Admin[];
   async findByLogin(login: string): Promise<Admin | undefined> {
      return this.admins.find(admin => admin.login === login);
   }
}
