import { MigrationInterface, QueryRunner } from 'typeorm';

export class FooScript1633770694348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('UP!!!!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('DOWN!!!!');
  }
}
