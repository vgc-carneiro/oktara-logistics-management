import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { packageDTOMock } from '../../mocks/package.dto.mock';
import {
  packageDeliveredMock,
  packageWarehouseMock,
  packagewithLocationMock,
  packageWithShipmentMock,
} from '../../mocks/package.mock';
import { ResponseMock } from '../../mocks/response.mock';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';

describe('PackageController', () => {
  let service: PackageService;
  let controller: PackageController;
  const dto = packageDTOMock;

  let responseMocked: ResponseMock;

  beforeEach(() => {
    service = new PackageService(null, null, null);
    controller = new PackageController(service);
    responseMocked = new ResponseMock();
  });

  describe('findPackages', () => {
    it('should return a list of packages', async () => {
      const pakage = packageWarehouseMock;
      const array = [pakage];

      jest.spyOn(service, 'list').mockResolvedValue(array);
      expect(await controller.list()).toBe(array);
    });
    it('should return a NotFoundException', async () => {
      jest.spyOn(service, 'list').mockImplementation(() => {
        throw new NotFoundException('No Package were found.');
      });
      try {
        await controller.list();
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Package were found.');
      }
    });
  });

  describe('createPackage', () => {
    it('should return create a Package and return the header with location', async () => {
      const pakage = packageWarehouseMock;

      jest.spyOn(service, 'createPackage').mockResolvedValue(pakage);
      await controller.create(dto, responseMocked);
      expect(responseMocked.headers[0].location).toBe(pakage.id);
      expect(responseMocked.code).toBe(HttpStatus.CREATED);
    });

    it('should throw a BadRequestException', async () => {
      try {
        jest.spyOn(service, 'createPackage').mockImplementation(() => {
          throw new BadRequestException('Error to insert a Package.');
        });
        await controller.create(dto, responseMocked);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('Error to insert a Package.');
      }
    });
  });

  describe('getPackage', () => {
    it('should return a Package specific Package', async () => {
      const pakage = packageWarehouseMock;

      jest.spyOn(service, 'get').mockResolvedValue(pakage);
      expect(await controller.get(pakage.id)).toBe(pakage);
    });

    it('should throw a NotFoundException', async () => {
      const pakage = packageWarehouseMock;
      jest.spyOn(service, 'get').mockImplementation(() => {
        throw new Error('No package were found.');
      });
      try {
        await controller.get(pakage.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No package were found.');
      }
    });

    it('should throw a BadRequestException', async () => {
      try {
        await controller.get('123');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ID must be an UUID identifier.');
      }
    });
  });

  describe('assignLocationToAPackage', () => {
    it('should return a Package with Location', async () => {
      jest
        .spyOn(service, 'assignLocation')
        .mockResolvedValue(packagewithLocationMock);

      expect(
        await controller.assignLocation(
          '87db7682-a310-4f35-a0e3-e569541783c0',
          '5aea509b-2741-442c-8e16-59c3faa5a69f',
        ),
      ).toBe(packagewithLocationMock);
    });

    it('should throw a BadRequestException for an ID', async () => {
      try {
        await controller.assignLocation('123', '123');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ID must be an UUID identifier.');
      }
    });

    it('should throw a BadRequestException for a LocationID', async () => {
      try {
        await controller.assignLocation(
          '87db7682-a310-4f35-a0e3-e569541783c0',
          '123',
        );
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('LocationID must be an UUID identifier.');
      }
    });
  });

  describe('addShipmentToAPackage', () => {
    it('should return a Package with Shipment', async () => {
      const pakage = packageWithShipmentMock;
      jest.spyOn(service, 'addShipment').mockResolvedValue(pakage);

      expect(await controller.addShipment(pakage.id, pakage.shipment_id)).toBe(
        pakage,
      );
    });

    it('should throw a BadRequestException for an ID', async () => {
      try {
        await controller.addShipment('123', '123');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ID must be an UUID identifier.');
      }
    });

    it('should throw a BadRequestException for a PackageID', async () => {
      try {
        await controller.addShipment(
          '87db7682-a310-4f35-a0e3-e569541783c0',
          '123',
        );
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ShipmentID must be an UUID identifier.');
      }
    });

    it('should throw a NotFoundException for a Shipment', async () => {
      try {
        jest.spyOn(service, 'addShipment').mockImplementation(() => {
          throw new NotFoundException('No Shipment were found.');
        });
        await controller.addShipment(
          '87db7682-a310-4f35-a0e3-e569541783c0',
          '87db7682-a310-4f35-a0e3-e569541783c0',
        );
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Shipment were found.');
      }
    });
  });

  describe('deliverAPackage', () => {
    it('should return a Package with Shipment', async () => {
      const pakage = packageDeliveredMock;
      jest.spyOn(service, 'deliver').mockResolvedValue(pakage);

      expect(await controller.deliver(pakage.id)).toBe(pakage);
    });

    it('should throw a BadRequestException for an ID', async () => {
      try {
        await controller.deliver('123');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ID must be an UUID identifier.');
      }
    });

    it('should throw a NotFoundException for a Package', async () => {
      try {
        jest.spyOn(service, 'deliver').mockImplementation(() => {
          throw new NotFoundException('No Package were found.');
        });
        await controller.deliver('87db7682-a310-4f35-a0e3-e569541783c0');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No Package were found.');
      }
    });
  });
});
