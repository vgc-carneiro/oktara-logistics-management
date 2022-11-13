import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ResponseMock } from '../../mocks/response.mock';
import { shipmentEmptyDTOMock, shipmentMock } from '../../mocks/shipment.mock';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';

describe('ShipmentController', () => {
  let service: ShipmentService;
  let controller: ShipmentController;

  let responseMocked: ResponseMock;

  beforeEach(() => {
    service = new ShipmentService(null, null, null);
    controller = new ShipmentController(service);
    responseMocked = new ResponseMock();
  });

  describe('createShipment', () => {
    it('should return create a Shipment and return the header with location', async () => {
      const shipment = shipmentMock;
      const dto = shipmentEmptyDTOMock;

      jest.spyOn(service, 'createShipment').mockResolvedValue(shipment);
      await controller.create(dto, responseMocked);
      expect(responseMocked.headers[0].location).toBe(shipment.id);
      expect(responseMocked.code).toBe(HttpStatus.CREATED);
    });

    it('should throw a BadRequestException', async () => {
      const dto = shipmentEmptyDTOMock;
      try {
        jest.spyOn(service, 'createShipment').mockImplementation(() => {
          throw new BadRequestException('Error to insert a Shipment.');
        });
        await controller.create(dto, responseMocked);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('Error to insert a Shipment.');
      }
    });
  });

  describe('getShipment', () => {
    it('should return a Shipment specific', async () => {
      const shipment = shipmentMock;

      jest.spyOn(service, 'get').mockResolvedValue(shipment);
      expect(await controller.get(shipment.id)).toBe(shipment);
    });

    it('should throw a NotFoundException', async () => {
      const shipment = shipmentMock;
      jest.spyOn(service, 'get').mockImplementation(() => {
        throw new Error('No shipment were found.');
      });
      try {
        await controller.get(shipment.id);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('No shipment were found.');
      }
    });

    it('should throw a BadRequestException', async () => {
      try {
        await controller.get('123');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ID must be an UUID identifier.');
      }
    });
  });

  describe('addPackageToAShipment', () => {
    it('should return a Shipment with Packages', async () => {
      const shipment = shipmentMock;
      jest.spyOn(service, 'addPackage').mockResolvedValue(shipment);

      expect(
        await controller.addPackage(
          '87db7682-a310-4f35-a0e3-e569541783c0',
          '5aea509b-2741-442c-8e16-59c3faa5a69f',
        ),
      ).toBe(shipment);
    });

    it('should throw a BadRequestException for an ID', async () => {
      try {
        await controller.addPackage('123', '123');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('ID must be an UUID identifier.');
      }
    });

    it('should throw a BadRequestException for a PackageID', async () => {
      try {
        await controller.addPackage(
          '87db7682-a310-4f35-a0e3-e569541783c0',
          '123',
        );
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error.message).toBe('PackageID must be an UUID identifier.');
      }
    });
  });
});
