import {
  shipmentEmptyDTOMock,
  shipmentFromDTOMock,
  shipmentMock,
  shipmentWithPackageMock,
  shipmentWithPackagesInTransitMock,
  shipmentWithPackagesInWarehouseMock,
} from '../../mocks/shipment.mock';
import { warehouseMock } from '../../mocks/warehouse.mock';
import { WarehouseRepository } from '../warehouse/warehouse.repository';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentService } from './shipment.service';

describe('PackageService', () => {
  let service: ShipmentService;
  let repository: ShipmentRepository;
  let warehouseRepository: WarehouseRepository;

  beforeEach(() => {
    repository = new ShipmentRepository(null);
    warehouseRepository = new WarehouseRepository(null)
    service = new ShipmentService(repository, warehouseRepository);
  });

  describe('listShipments', () => {
    it('should return a list of shipments', async () => {
      const shipment = shipmentWithPackageMock;
      const array = [shipment];
      const warehouse = warehouseMock;
      const warehouseArray = [warehouseMock];

      jest.spyOn(repository, 'find').mockResolvedValue(array);
      jest.spyOn(warehouseRepository, 'find').mockResolvedValue(warehouseArray);
      expect(await service.list()).toBe(array);
    });
    it('should return a NotFoundException', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      try {
        await service.list();
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Shipment were found.');
      }
    });
  });

  describe('createShipment', () => {
    it('should return create a Shipment', async () => {
      const dto = shipmentEmptyDTOMock;
      const model = shipmentFromDTOMock(dto);

      jest.spyOn(repository, 'countAvailable').mockResolvedValue(0);
      jest.spyOn(repository, 'save').mockResolvedValue(model);
      const result = await service.createShipment(dto);

      expect(result).toBe(model);
    });

    it('should throw a BadRequestException', async () => {
      try {
        const dto = shipmentEmptyDTOMock;
        jest.spyOn(repository, 'countAvailable').mockResolvedValue(0);
        jest.spyOn(repository, 'save').mockImplementation(() => {
          throw new Error('Error to insert a Shipment.');
        });
        await service.createShipment(dto);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('Error to insert a Shipment.');
      }
    });

    it('should throw a BadRequestException because there is an Active Shipment', async () => {
      try {
        const dto = shipmentEmptyDTOMock;
        jest.spyOn(repository, 'countAvailable').mockResolvedValue(1);
        await service.createShipment(dto);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe(
          'There is an active shipment! Wait until it finishes.',
        );
      }
    });
  });

  describe('getShipment', () => {
    it('should return a Shipment specific', async () => {
      const shipment = shipmentMock;

      jest.spyOn(repository, 'get').mockResolvedValue(shipment);
      expect(await service.get(shipment.id)).toBe(shipment);
    });

    it('should throw a NotFoundException', async () => {
      const shipment = shipmentMock;
      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.get(shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No shipment were found.');
      }
    });
  });

  describe('startRoute', () => {
    it('should return a Shipment started', async () => {
      const shipment = shipmentWithPackagesInWarehouseMock;

      jest.spyOn(repository, 'get').mockResolvedValue(shipment);
      jest.spyOn(repository, 'update').mockResolvedValue(shipment);
      expect(await service.startRoute(shipment.id)).toBe(shipment);
    });

    it('should throw a NotFoundException', async () => {
      const shipment = shipmentMock;
      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.startRoute(shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No shipment were found.');
      }
    });

    it('should throw a BadRequestException, no packages inside the shipment.', async () => {
      const shipment = shipmentMock;
      jest.spyOn(repository, 'get').mockResolvedValue(shipment);
      try {
        await service.startRoute(shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No packages inside this Shipment.');
      }
    });

    it('should throw a BadRequestException, shipment already start deliverying.', async () => {
      const shipment = shipmentWithPackagesInTransitMock;
      jest.spyOn(repository, 'get').mockResolvedValue(shipment);
      try {
        await service.startRoute(shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe(
          'This shipment has already started its deliveries.',
        );
      }
    });
  });
});
