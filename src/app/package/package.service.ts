import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocationRepository } from '../warehouse/location/location.repository';
import { PackageDTO } from './dto/package.dto';
import { Package } from './package';
import { PackageEntity } from './package.entity';
import { PackageRepository } from './package.repository';

@Injectable()
export class PackageService {
  constructor(
    private readonly repository: PackageRepository,
    private readonly locationRepository: LocationRepository,
  ) {}
  async createPackage(dto: PackageDTO): Promise<PackageEntity> {
    const packageDomain = new Package(dto);
    try {
      return this.repository.save(packageDomain);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get(id: string): Promise<PackageEntity> {
    const pakage = await this.repository.get(id);
    if (!pakage) throw new NotFoundException('No package were found.');
    return pakage;
  }

  async assignLocation(id: string, locationID: string): Promise<PackageEntity> {
    const pakage = await this.repository.get(id);
    if (!pakage) throw new NotFoundException('No package were found.');

    if (!pakage.isPossibleAssignLocation())
      throw new BadRequestException(
        'The Package it is not inside the warehouse anymore.',
      );

    const location = await this.locationRepository.get(locationID);
    if (!location) throw new NotFoundException('No location were found.');

    if (!location.isAvailable())
      throw new BadRequestException('The Location is not available.');

    if (pakage.location) {
      pakage.location.package_id = null;
      await this.locationRepository.update(pakage.location);
    }

    location.package_id = pakage.id;

    await this.locationRepository.update(location);

    return await this.repository.get(pakage.id);
  }
}
