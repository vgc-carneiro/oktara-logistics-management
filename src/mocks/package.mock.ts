import { EStatusPackage } from '../../src/app/package/status.enum';
import { PackageEntity } from '../../src/app/package/package.entity';

const packageWarehouseMock: PackageEntity = {
  id: '123',
  status_id: EStatusPackage.WAREHOUSE,
  latitude_destination: -26.894393,
  longitude_destination: -48.674066,
};

export { packageWarehouseMock };
