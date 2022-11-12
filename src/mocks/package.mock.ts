import { EStatusPackage } from '../../src/app/package/status.enum';
import { PackageEntity } from '../../src/app/package/package.entity';
import { PackageDTO } from '../app/package/dto/package.dto';

const packageWarehouseMock: PackageEntity = {
  id: '123',
  status_id: EStatusPackage.WAREHOUSE,
  latitude_destination: -26.894393,
  longitude_destination: -48.674066,
};

const packageFromDTOMock = (dto: PackageDTO): PackageEntity => {
  return {
    id: '123',
    status_id: EStatusPackage.WAREHOUSE,
    latitude_destination: dto.latitudeDestination,
    longitude_destination: dto.longitudeDestination,
  };
};

export { packageWarehouseMock, packageFromDTOMock };
