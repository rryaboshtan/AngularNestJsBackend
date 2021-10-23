import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { Admin } from '../../model/admin.entity';
import * as bcrypt from 'bcrypt';

export class CreateFirstAdmin1633985412797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);

    if (await adminRepository.findOne({ where: { login: 'admin' } })) {
      return;
    }

    const admin: Admin = adminRepository.create({
      login: 'admin',
      password: await bcrypt.hash('secret', 10),
      nickName: 'Roman',
    });

    await adminRepository.insert(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);

    const admin: Admin = await adminRepository.findOne({
      where: { login: 'admin' },
    });

    if (!admin) {
      return;
    }

    await adminRepository.remove(admin);
  }
}
