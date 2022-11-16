import { EStatusPackage } from '../app/package/status.enum';
import { ShipmentDTO } from '../app/shipment/dto/shipment.dto';
import { ShipmentEntity } from '../app/shipment/shipment.entity';

const shipmentEmptyDTOMock: ShipmentDTO = {
  estimatedRoute: null,
  finishedRoute: null,
  startRoute: null,
};

const shipmentMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  packages: [],
  isAvailableToPackages() {
    return true;
  },
}

const shipmentWithPackageMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  packages: [
    {
      id: '87db7682-a310-4f35-a0e3-e569541783c0',
      shipment_id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
      status_id: EStatusPackage.TRANSIT,
      latitude_destination: -26.894393,
      longitude_destination: -48.674066,
      isPossibleAssignLocation() {
        return this.status_id === EStatusPackage.WAREHOUSE;
      }
    },
    {
      id: '87db7682-a310-4f35-a0e3-e569541783c1',
      shipment_id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
      status_id: EStatusPackage.TRANSIT,
      latitude_destination: -26.894393,
      longitude_destination: -48.674066,
      isPossibleAssignLocation() {
        return this.status_id === EStatusPackage.WAREHOUSE;
      }
    },
    {
      id: '87db7682-a310-4f35-a0e3-e569541783c2',
      shipment_id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
      status_id: EStatusPackage.TRANSIT,
      latitude_destination: -26.894393,
      longitude_destination: -48.674066,
      isPossibleAssignLocation() {
        return this.status_id === EStatusPackage.WAREHOUSE;
      }
    },
  ],
  isAvailableToPackages() {
    return true;
  },
};

const shipmentWithPackagesInWarehouseMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  packages: [
    {
      id: '87db7682-a310-4f35-a0e3-e569541783c0',
      status_id: EStatusPackage.WAREHOUSE,
      latitude_destination: -26.894393,
      longitude_destination: -48.674066,
    },
  ],
  isAvailableToPackages() {
    return true;
  },
};

const shipmentWithPackagesInTransitMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  start_route: new Date(),
  packages: [
    {
      id: '87db7682-a310-4f35-a0e3-e569541783c0',
      status_id: EStatusPackage.TRANSIT,
      latitude_destination: -26.894393,
      longitude_destination: -48.674066,
    },
  ],
  isAvailableToPackages() {
    return false;
  },
};

const shipmentNotAvailableMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  packages: null,
  isAvailableToPackages() {
    return false;
  },
};

const shipmentReadyToBeDeliveredMock: ShipmentEntity = {
  id: '5aea509b-2741-442c-8e16-59c3faa5a69f',
  start_route: new Date('2022-11-11'),
  packages: [
    {
      id: '87db7682-a310-4f35-a0e3-e569541783c0',
      status_id: EStatusPackage.DELIVERED,
      latitude_destination: -26.894393,
      longitude_destination: -48.674066,
      isPossibleAssignLocation() {
        return false;
      },
    },
  ],
  isAvailableToPackages() {
    return false;
  },
};

const shipmentFromDTOMock = (dto: ShipmentDTO): ShipmentEntity => {
  return {
    id: '87db7682-a310-4f35-a0e3-e569541783c0',
    start_route: dto.startRoute,
    estimated_route: dto.estimatedRoute,
    finished_route: dto.finishedRoute,
    packages: null,
    isAvailableToPackages() {
      return true;
    },
  };
};

export {
  shipmentMock,
  shipmentNotAvailableMock,
  shipmentEmptyDTOMock,
  shipmentWithPackagesInWarehouseMock,
  shipmentWithPackagesInTransitMock,
  shipmentReadyToBeDeliveredMock,
  shipmentWithPackageMock,
  shipmentFromDTOMock,
};
