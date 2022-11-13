import { packageWarehouseMock } from '../../mocks/package.mock';
import {
  shipmentEmptyDTOMock,
  shipmentFromDTOMock,
  shipmentMock,
} from '../../mocks/shipment.mock';
import { PackageRepository } from '../package/package.repository';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentService } from './shipment.service';

describe('PackageService', () => {
  let service: ShipmentService;
  let repository: ShipmentRepository;
  let packageRepository: PackageRepository;

  beforeEach(() => {
    repository = new ShipmentRepository(null);
    packageRepository = new PackageRepository(null);
    service = new ShipmentService(repository, packageRepository);
  });

  describe('createShipment', () => {
    it('should return create a Shipment', async () => {
      const dto = shipmentEmptyDTOMock;
      const model = shipmentFromDTOMock(dto);

      jest.spyOn(repository, 'save').mockResolvedValue(model);
      const result = await service.createShipment(dto);

      expect(result).toBe(model);
    });

    it('should throw a BadRequestException', async () => {
      try {
        const dto = shipmentEmptyDTOMock;
        jest.spyOn(repository, 'save').mockImplementation(() => {
          throw new Error('Error to insert a Shipment.');
        });
        await service.createShipment(dto);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('Error to insert a Shipment.');
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

  describe('addPackageToShipment', () => {
    it('should throw a NotFoundException for Shipment', async () => {
      const pakage = packageWarehouseMock;
      const shipment = shipmentMock;

      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.addPackage(shipment.id, pakage.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Shipment were found.');
      }
    });

    it('should throw a NotFoundException for Location', async () => {
      const pakage = packageWarehouseMock;
      const shipment = shipmentMock;
      jest.spyOn(repository, 'get').mockResolvedValue(shipment);
      jest.spyOn(packageRepository, 'get').mockResolvedValue(null);
      try {
        await service.addPackage(shipment.id, pakage.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Package were found.');
      }
    });
  });
});
