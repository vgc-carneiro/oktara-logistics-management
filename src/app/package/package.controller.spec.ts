import { BadRequestException, HttpStatus } from '@nestjs/common';
import { packageDTOMock } from '../../mocks/package.dto.mock';
import { packageWarehouseMock } from '../../mocks/package.mock';
import { ResponseMock } from '../../mocks/response.mock';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';

describe('PackageController', () => {
  let service: PackageService;
  let controller: PackageController;
  const dto = packageDTOMock;

  let responseMocked: ResponseMock;

  beforeEach(() => {
    service = new PackageService();
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

    it('should throw a NotFoundException', async () => {
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
});
