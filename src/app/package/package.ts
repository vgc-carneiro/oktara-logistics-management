import { PackageDTO } from './dto/package.dto';
import { EStatusPackage } from './status.enum';

export class Package {
  id?: string;
  shipment_id?: string;
  location_id?: string;
  status_id: EStatusPackage;
  latitude: number;
  longitude: number;
  constructor(dto: PackageDTO) {
    this.latitude = dto.latitudeDestination;
    this.longitude = dto.longitudeDestination;
  }
}
