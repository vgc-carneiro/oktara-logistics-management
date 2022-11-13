import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLocationTable1668226870565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table location
      (
          id           uuid      default uuid_generate_v4() not null
              constraint "LOCATION_pk"
                  primary key,
          warehouse_id uuid                                 not null
              constraint location_warehouse_fk
                  references warehouse,
          floor        varchar(50),
          hall         varchar(50),
          shelf        varchar(15)                          not null,
          created_at   timestamp default now()              not null,
          updated_at   timestamp default now()              not null
      ); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table location;');
  }
}
