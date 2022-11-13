import { BadRequestException, HttpStatus } from '@nestjs/common';
import { packageDTOMock } from '../../mocks/package.dto.mock';
import {
  packageWarehouseMock,
  packagewithLocationMock,
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
    service = new PackageService(null);
    controller = new PackageController(service);
    responseMocked = new ResponseMock();
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
});
