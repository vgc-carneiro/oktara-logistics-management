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
        latitude: 9.947525,
        longitude: -84.121088,
      },
    ];

    const warehouseStored = await this.repository.find();
    if(warehouseStored.length > 0) return

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
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Fourth Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Fifth Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Sixth Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Seventh Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Eighth Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Nineth Shelf',
          },
          {
            warehouse_id: warehouseEntity.id,
            shelf: 'Tenth Shelf',
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
