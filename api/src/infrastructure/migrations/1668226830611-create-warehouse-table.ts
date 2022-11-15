import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWarehouseTable1668226830611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table public.WAREHOUSE
      (
          id         uuid      default uuid_generate_v4() not null
              constraint "WAREHOUSE_pk"
                  primary key,
          NAME       varchar                              not null,
          LATITUDE   numeric                              not null,
          LONGITUDE  numeric                              not null,
          CREATED_AT timestamp default now()              not null,
          UPDATED_AT timestamp default now()              not null
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table warehouse;`);
  }
}
