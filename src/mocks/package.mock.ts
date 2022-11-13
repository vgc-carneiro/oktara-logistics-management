import { EStatusPackage } from '../../src/app/package/status.enum';
import { PackageEntity } from '../../src/app/package/package.entity';
import { PackageDTO } from '../app/package/dto/package.dto';

const packageWarehouseMock: PackageEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  status_id: EStatusPackage.WAREHOUSE,
  latitude_destination: -26.894393,
  longitude_destination: -48.674066,
  isPossibleAssignLocation() {
    return this.status_id === EStatusPackage.WAREHOUSE;
  },
};

const packageTransitMock: PackageEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  status_id: EStatusPackage.TRANSIT,
  latitude_destination: -26.894393,
  longitude_destination: -48.674066,
  isPossibleAssignLocation() {
    return this.status_id === EStatusPackage.WAREHOUSE;
  },
};

const packagewithLocationMock: PackageEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  status_id: EStatusPackage.WAREHOUSE,
  location_id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
  latitude_destination: -26.894393,
  longitude_destination: -48.674066,
  location: {
    id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
    shelf: 'Third shelf on right',
    warehouse_id: 'ac621e58-870c-49a3-acfa-b53f3f41faf0',
  },
  isPossibleAssignLocation() {
    return this.status_id === EStatusPackage.WAREHOUSE;
  },
};

const packageWithShipmentMock: PackageEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  status_id: EStatusPackage.WAREHOUSE,
  location_id: null,
  latitude_destination: -26.894393,
  longitude_destination: -48.674066,
  shipment_id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
  shipment: {
    id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
    packages: null,
    isAvailableToPackages() {
      return true;
    },
  },
  isPossibleAssignLocation() {
    return this.status_id === EStatusPackage.WAREHOUSE;
  },
};

const packageFromDTOMock = (dto: PackageDTO): PackageEntity => {
  return {
    id: '87db7682-a310-4f35-a0e3-e569541783c0',
    status_id: EStatusPackage.WAREHOUSE,
    latitude_destination: dto.latitudeDestination,
    longitude_destination: dto.longitudeDestination,
  };
};

export {
  packageWarehouseMock,
  packagewithLocationMock,
  packageTransitMock,
  packageWithShipmentMock,
  packageFromDTOMock,
};
