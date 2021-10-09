import { Injectable } from '@nestjs/common';
import { Admin } from 'src/modules/admin/model/admin';
import { AdminRepository } from 'src/modules/admin/service/admin.repository';

@Injectable()
export class AuthService {
   constructor(private adminRepository: AdminRepository) {}

   async validateAdmin(login: string, passw: string): Promise<Admin> {
      const admin: Admin = await this.adminRepository.findByLogin(login);

      if (admin?.password === passw) {
         const { password, ...secureAdmin } = admin;
         return secureAdmin;
      }

      return null;
   }
}
