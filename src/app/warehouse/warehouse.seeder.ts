import { Injectable, Logger } from '@nestjs/common';
import { Location } from './location/location';
import { LocationRepository } from './location/location.repository';
import { Warehouse } from './warehouse';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehouseSeeder {
  constructor(
    private readonly repository: WarehouseRepository,
    private readonly locationRepository: LocationRepository,
  ) {}

  async seed() {
    let promises = [];

    const data_seeder: Warehouse[] = [
      {
        name: 'Highway warehouse borther ltd.',
        latitude: -23.315089,
        longitude: -51.175864,
      },
      {
        name: 'Sea warehouse Itajai LTD.',
        latitude: -26.894393,
        longitude: -48.674066,
      },
    ];

    data_seeder.forEach(async (warehouse) => {
      try {
        const warehouseEntity = await this.repository.save(warehouse);

        const location_seeder: Location[] = [
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'First Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Second Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Third Shelf',
          },
        ];

        location_seeder.forEach(async (location) => {
          await this.locationRepository.save(location);
        });
      } catch (e: any) {
        Logger.error(e);
      }
    });

    await Promise.all(promises);
  }
}
