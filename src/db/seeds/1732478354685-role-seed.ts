import { MigrationInterface, QueryRunner } from 'typeorm';
import { seedRole } from './seeders/role.seed';

export class RoleSeed1732478354685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await seedRole(queryRunner.connection);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
