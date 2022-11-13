import { locationAvailableMock, locationMock } from '../../mocks/location.mock';
import { packageDTOMock } from '../../mocks/package.dto.mock';
import {
  packageFromDTOMock,
  packageTransitMock,
  packageWarehouseMock,
  packagewithLocationMock,
  packageWithShipmentMock,
} from '../../mocks/package.mock';
import {
  shipmentMock,
  shipmentNotAvailableMock,
  shipmentReadyToBeDeliveredMock,
} from '../../mocks/shipment.mock';
import { ShipmentRepository } from '../shipment/shipment.repository';
import { LocationRepository } from '../warehouse/location/location.repository';
import { PackageRepository } from './package.repository';
import { PackageService } from './package.service';
import { EStatusPackage } from './status.enum';

describe('PackageService', () => {
  let service: PackageService;
  let repository: PackageRepository;
  let locationRepository: LocationRepository;
  let shipmentRepository: ShipmentRepository;
  const dto = packageDTOMock;

  beforeEach(() => {
    repository = new PackageRepository(null);
    locationRepository = new LocationRepository(null);
    shipmentRepository = new ShipmentRepository(null);
    service = new PackageService(
      repository,
      locationRepository,
      shipmentRepository,
    );
  });

  describe('createPackage', () => {
    it('should return create a Package', async () => {
      const pakage = packageFromDTOMock(dto);
      jest.spyOn(repository, 'save').mockResolvedValue(pakage);
      const result = await service.createPackage(dto);

      expect(result).toBe(pakage);
      expect(dto.latitudeDestination).toBe(result.latitude_destination);
      expect(dto.longitudeDestination).toBe(result.longitude_destination);
    });

    it('should throw a BadRequestException', async () => {
      try {
        jest.spyOn(repository, 'save').mockImplementation(() => {
          throw new Error('Error to insert a Package.');
        });
        await service.createPackage(dto);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('Error to insert a Package.');
      }
    });
  });

  describe('getPackage', () => {
    it('should return a Package specific Package', async () => {
      const pakage = packageWarehouseMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      expect(await service.get(pakage.id)).toBe(pakage);
    });

    it('should throw a NotFoundException', async () => {
      const pakage = packageWarehouseMock;
      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.get(pakage.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No package were found.');
      }
    });
  });

  describe('assignLocation', () => {
    it('should throw a NotFoundException for Package', async () => {
      const pakage = packageWarehouseMock;
      const location = locationMock;

      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.assignLocation(pakage.id, location.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No package were found.');
      }
    });

    it('should throw a BadRequestException for isPossibleAssignLocation', async () => {
      const pakage = packageTransitMock;
      const location = locationMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      try {
        await service.assignLocation(pakage.id, location.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe(
          'The Package it is not inside the warehouse anymore.',
        );
      }
    });

    it('should throw a NotFoundException for Location', async () => {
      const pakage = packageWarehouseMock;
      const location = locationMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      jest.spyOn(locationRepository, 'get').mockResolvedValue(null);
      try {
        await service.assignLocation(pakage.id, location.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No location were found.');
      }
    });

    it('should throw a BadRequestException for Location it is not available', async () => {
      const pakage = packageWarehouseMock;
      const location = locationMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      jest.spyOn(locationRepository, 'get').mockResolvedValue(location);
      try {
        await service.assignLocation(pakage.id, location.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('The Location is not available.');
      }
    });

    it('should return a Pakage with the Location', async () => {
      const pakageLocation = packagewithLocationMock;
      const locationAvailable = locationAvailableMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakageLocation);
      jest
        .spyOn(locationRepository, 'get')
        .mockResolvedValue(locationAvailable);
      jest.spyOn(repository, 'update').mockResolvedValue(pakageLocation);
      jest.spyOn(repository, 'get').mockResolvedValue(pakageLocation);
      expect(
        await service.assignLocation(pakageLocation.id, locationAvailable.id),
      ).toBe(pakageLocation);
    });
  });

  describe('addShipmentToAPackage', () => {
    it('should throw a NotFoundException for Shipment', async () => {
      const pakage = packageWarehouseMock;
      const shipment = shipmentMock;

      jest.spyOn(repository, 'get').mockResolvedValue(packageWarehouseMock);
      jest.spyOn(shipmentRepository, 'get').mockResolvedValue(null);
      try {
        await service.addShipment(pakage.id, shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Shipment were found.');
      }
    });

    it('should throw a NotFoundException for Package', async () => {
      const pakage = packageWarehouseMock;
      const shipment = shipmentMock;
      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.addShipment(pakage.id, shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Package were found.');
      }
    });

    it('should throw a BadRequestException for isPossibleAssignLocation', async () => {
      const pakage = packageTransitMock;
      const shipment = shipmentMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      try {
        await service.addShipment(pakage.id, shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe(
          'The Package it is not inside the warehouse anymore.',
        );
      }
    });

    it('should throw a BadRequestException for Shipment Not Available', async () => {
      const pakage = packageWarehouseMock;
      const shipment = shipmentNotAvailableMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      jest.spyOn(shipmentRepository, 'get').mockResolvedValue(shipment);
      try {
        await service.addShipment(pakage.id, shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe(
          'Sorry. This shipment is not available for packages right now.',
        );
      }
    });

    it('should return a Package with Shipment inside.', async () => {
      const pakage = packageWithShipmentMock;
      const shipment = packageWithShipmentMock.shipment;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      jest.spyOn(shipmentRepository, 'get').mockResolvedValue(shipment);
      jest.spyOn(repository, 'update').mockResolvedValue(pakage);
      expect(await service.addShipment(pakage.id, shipment.id)).toBe(pakage);
    });
  });

  describe('deliverPackage', () => {
    it('should throw a NotFoundException for Package', async () => {
      const pakage = packageTransitMock;

      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.deliver(pakage.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Package were found.');
      }
    });

    it('should throw a BadRequestException for Package it is not in transit', async () => {
      const pakage = packageWarehouseMock;
      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      try {
        await service.deliver(pakage.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('The Package is not in transit.');
      }
    });

    it('should return a Package delivered.', async () => {
      const pakage = packageTransitMock;
      const shipment = shipmentReadyToBeDeliveredMock;

      jest.spyOn(repository, 'get').mockResolvedValue(pakage);
      jest.spyOn(repository, 'update').mockImplementationOnce(async () => {
        pakage.status_id = EStatusPackage.DELIVERED;
        return pakage;
      });

      jest.spyOn(shipmentRepository, 'get').mockResolvedValue(shipment);
      jest
        .spyOn(shipmentRepository, 'update')
        .mockImplementationOnce(async () => {
          shipment.finished_route = new Date();
          return shipment;
        });

      const result = await service.deliver(pakage.id);
      expect(result.status_id).toBe(EStatusPackage.DELIVERED);
    });
  });
});
