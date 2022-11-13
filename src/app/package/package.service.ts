import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShipmentRepository } from '../shipment/shipment.repository';
import { LocationRepository } from '../warehouse/location/location.repository';
import { PackageDTO } from './dto/package.dto';
import { Package } from './package';
import { PackageEntity } from './package.entity';
import { PackageRepository } from './package.repository';
import { EStatusPackage } from './status.enum';

@Injectable()
export class PackageService {
  constructor(
    private readonly repository: PackageRepository,
    private readonly locationRepository: LocationRepository,
    private readonly shipmentRepository: ShipmentRepository,
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

    pakage.location = location;
    pakage.shipment = null;

    await this.repository.update(pakage);

    return await this.repository.get(pakage.id);
  }

  async addShipment(id: string, shipmentID: string): Promise<PackageEntity> {
    const pakage = await this.repository.get(id);
    if (!pakage) throw new NotFoundException('No Package were found.');

    if (!pakage.isPossibleAssignLocation())
      throw new BadRequestException(
        'The Package it is not inside the warehouse anymore.',
      );

    const shipment = await this.shipmentRepository.get(shipmentID, false);
    if (!shipment) throw new NotFoundException('No Shipment were found.');

    if (!shipment.isAvailableToPackages())
      throw new BadRequestException(
        'Sorry. This shipment is not available for packages right now.',
      );

    pakage.location = null;
    pakage.shipment = shipment;

    const updated = await this.repository.update(pakage);

    return updated;
  }

  async deliver(id: string): Promise<PackageEntity> {
    const pakage = await this.repository.get(id);
    if (!pakage) throw new NotFoundException('No Package were found.');

    if (pakage.status_id != EStatusPackage.TRANSIT)
      throw new BadRequestException('The Package is not in transit.');

    pakage.status_id = EStatusPackage.DELIVERED;

    return await this.repository.update(pakage);
  }
}
