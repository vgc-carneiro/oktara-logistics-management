import { packageDTOMock } from '../../mocks/package.dto.mock';
import { packageFromDTOMock } from '../../mocks/package.mock';
import { PackageRepository } from './package.repository';
import { PackageService } from './package.service';

describe('PackageService', () => {
  let service: PackageService;
  let repository: PackageRepository;
  const dto = packageDTOMock;

  beforeEach(() => {
    repository = new PackageRepository(null);
    service = new PackageService(repository);
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
});
