import { MigrationInterface, QueryRunner } from 'typeorm';

export class BarScript1633779320113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Bar Script UP');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Bar Script DOWN');
  }
}
