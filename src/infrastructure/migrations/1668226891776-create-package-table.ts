import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPackageTable1668226891776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table package
      (
          id                    uuid      default uuid_generate_v4() not null
              constraint "PACKAGE_pk"
                  primary key,
          shipment_id           uuid
              constraint "PACKAGE_shipment_fk"
                  references shipment (id),
          status_id             integer default 0                    not null,
          latitude_destination  numeric                              not null,
          longitude_destination numeric                              not null,
          created_at            timestamp default now()              not null,
          updated_at            timestamp default now()              not null
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table package;');
  }
}
