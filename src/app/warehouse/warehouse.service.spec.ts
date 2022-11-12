import { NotFoundException } from '@nestjs/common';
import { warehouseMock } from '../../mocks/warehouse.mock';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseService } from './warehouse.service';

describe('WarehouseService', () => {
  let service: WarehouseService;
  let repository: WarehouseRepository;
  const warehouse = warehouseMock;

  beforeEach(() => {
    repository = new WarehouseRepository(null);
    service = new WarehouseService(repository);
  });

  describe('list', () => {
    it('should return a list of warehouses', async () => {
      const array = [warehouse];
      jest.spyOn(repository, 'find').mockResolvedValue(array);
      expect(await service.list()).toBe(array);
    });

    it('should throw a NotFoundException', async () => {
      try {
        jest.spyOn(repository, 'find').mockResolvedValue([]);
        await service.list();
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Warehouses were found.');
      }
    });
  });
});
