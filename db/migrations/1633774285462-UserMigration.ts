import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1633774285462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('UP!!!!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('DOWN!!!!');
  }
}
