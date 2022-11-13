import { ShipmentDTO } from '../app/shipment/dto/shipment.dto';
import { ShipmentEntity } from '../app/shipment/shipment.entity';

const shipmentEmptyDTOMock: ShipmentDTO = {
  estimatedRoute: null,
  finishedRoute: null,
  startRoute: null,
};

const shipmentMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  packages: null,
  isAvailableToPackages() {
    return true;
  },
};

const shipmentNotAvailableMock: ShipmentEntity = {
  id: '87db7682-a310-4f35-a0e3-e569541783c0',
  packages: null,
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
  shipmentFromDTOMock,
};
