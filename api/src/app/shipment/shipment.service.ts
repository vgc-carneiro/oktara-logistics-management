import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EStatusPackage } from '../package/status.enum';
import { WarehouseRepository } from '../warehouse/warehouse.repository';
import { ShipmentDTO } from './dto/shipment.dto';
import { Shipment } from './shipment';
import { ShipmentEntity } from './shipment.entity';
import { ShipmentRepository } from './shipment.repository';

@Injectable()
export class ShipmentService {
  constructor(private readonly repository: ShipmentRepository, 
    private readonly warehouseRepository: WarehouseRepository
    ) {}

  async list(): Promise<ShipmentEntity[]> {
    const shipments = await this.repository.find();
    if (shipments.length === 0)
      throw new NotFoundException('No Shipment were found.');

    const warehouse = await this.warehouseRepository.find();
    shipments.map((shipment) => {
      shipment.packages.map((pakage) => {
        pakage.distance = this.distance(warehouse[0].latitude, warehouse[0].longitude, pakage.latitude_destination, pakage.longitude_destination)
      })
      shipment.packages = shipment.packages.sort(( a, b ) => {
      if ( a.distance < b.distance ){
        return -1;
      }
      if ( a.distance > b.distance ){
        return 1;
      }
      return 0;
    })
    })
    
    return shipments;
  }

  async createShipment(dto: ShipmentDTO): Promise<ShipmentEntity> {
    const available = await this.repository.countAvailable();

    if (available > 0)
      throw new BadRequestException(
        'There is an active shipment! Wait until it finishes.',
      );

    const shipmentDomain = new Shipment(dto);
    try {
      return this.repository.save(shipmentDomain);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get(id: string): Promise<ShipmentEntity> {
    const shipment = await this.repository.get(id);
    if (!shipment) throw new NotFoundException('No shipment were found.');
    return shipment;
  }

  async startRoute(id: string): Promise<ShipmentEntity> {
    const shipment = await this.repository.get(id);
    if (!shipment) throw new NotFoundException('No shipment were found.');

    if (shipment.packages.length === 0)
      throw new BadRequestException('No packages inside this Shipment.');

    if (!shipment.isAvailableToPackages())
      throw new BadRequestException(
        'This shipment has already started its deliveries.',
      );

    shipment.packages.forEach((pakage) => {
      pakage.status_id = EStatusPackage.TRANSIT;
    });

    shipment.start_route = new Date();
    return await this.repository.update(shipment);
  }

  private distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344 
		return +(Math.round(dist * 100) / 100).toFixed(2);
	}
}
}
