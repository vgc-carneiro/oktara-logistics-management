import { MigrationInterface, QueryRunner } from 'typeorm';

export class createShipmentTable1668226863437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table shipment
      (
          id              uuid      default uuid_generate_v4() not null
              constraint "SHIPMENT_pk"
                  primary key,
          start_route     timestamp                            not null,
          estimated_route timestamp                            not null,
          finished_route  timestamp                            not null,
          created_at      timestamp default now()              not null,
          updated_at      timestamp default now()              not null
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table shipment;`);
  }
}
