import {
  shipmentEmptyDTOMock,
  shipmentFromDTOMock,
  shipmentMock,
} from '../../mocks/shipment.mock';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentService } from './shipment.service';

describe('PackageService', () => {
  let service: ShipmentService;
  let repository: ShipmentRepository;

  beforeEach(() => {
    repository = new ShipmentRepository(null);
    service = new ShipmentService(repository);
  });

  describe('createShipment', () => {
    it('should return create a Shipment', async () => {
      const dto = shipmentEmptyDTOMock;
      const model = shipmentFromDTOMock(dto);

      jest.spyOn(repository, 'countAvailable').mockResolvedValue(0);
      jest.spyOn(repository, 'save').mockResolvedValue(model);
      const result = await service.createShipment(dto);

      expect(result).toBe(model);
    });

    it('should throw a BadRequestException', async () => {
      try {
        const dto = shipmentEmptyDTOMock;
        jest.spyOn(repository, 'countAvailable').mockResolvedValue(0);
        jest.spyOn(repository, 'save').mockImplementation(() => {
          throw new Error('Error to insert a Shipment.');
        });
        await service.createShipment(dto);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('Error to insert a Shipment.');
      }
    });

    it('should throw a BadRequestException because there is an Active Shipment', async () => {
      try {
        const dto = shipmentEmptyDTOMock;
        jest.spyOn(repository, 'countAvailable').mockResolvedValue(1);
        await service.createShipment(dto);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe(
          'There is an active shipment! Wait until it finishes.',
        );
      }
    });
  });

  describe('getShipment', () => {
    it('should return a Shipment specific', async () => {
      const shipment = shipmentMock;

      jest.spyOn(repository, 'get').mockResolvedValue(shipment);
      expect(await service.get(shipment.id)).toBe(shipment);
    });

    it('should throw a NotFoundException', async () => {
      const shipment = shipmentMock;
      jest.spyOn(repository, 'get').mockResolvedValue(null);
      try {
        await service.get(shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No shipment were found.');
      }
    });
  });
});
