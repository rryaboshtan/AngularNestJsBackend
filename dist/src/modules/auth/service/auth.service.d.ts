import { Admin } from 'src/modules/admin/model/admin';
import { AdminRepository } from 'src/modules/admin/service/admin.repository';
export declare class AuthService {
    private adminRepository;
    constructor(adminRepository: AdminRepository);
    validateAdmin(login: string, passw: string): Promise<Admin>;
}
