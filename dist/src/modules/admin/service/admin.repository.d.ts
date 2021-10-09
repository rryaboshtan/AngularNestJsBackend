import { Admin } from '../model/admin';
export declare class AdminRepository {
    constructor();
    private readonly admins;
    findByLogin(login: string): Promise<Admin | undefined>;
}
