import { NotFoundException } from '@nestjs/common';
import { warehouseMocked } from '../../../test/mocks/warehouse.mock';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';

describe('WarehouseController', () => {
  let warehouseService: WarehouseService;
  let warehouseController: WarehouseController;

  const warehouse = warehouseMocked;

  beforeEach(() => {
    warehouseService = new WarehouseService(null);
    warehouseController = new WarehouseController(warehouseService);
  });

  describe('listWarehouses', () => {
    it('should return a list of warehouses', async () => {
      const array = [warehouse];
      jest.spyOn(warehouseService, 'list').mockResolvedValue(array);
      expect(await warehouseController.list()).toBe(array);
    });

    it('should throw a NotFoundException', async () => {
      try {
        jest.spyOn(warehouseService, 'list').mockImplementation(() => {
          throw new NotFoundException('No Warehouses were found.');
        });
        await warehouseController.list();
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Warehouses were found.');
      }
    });
  });
});
