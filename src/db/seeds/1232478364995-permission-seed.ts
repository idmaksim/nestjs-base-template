import { MigrationInterface, QueryRunner } from 'typeorm';
import { seedPermission } from './seeders/permission.seed';

export class PermissionSeed1232478364995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await seedPermission(queryRunner.connection);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
