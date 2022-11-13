import { ShipmentDTO } from './dto/shipment.dto';

export class Shipment {
  id?: string;
  start_route?: Date;
  estimated_route?: Date;
  finished_route?: Date;
  constructor(dto: ShipmentDTO) {
    if (dto.startRoute) this.start_route = dto.startRoute;
    if (dto.estimatedRoute) this.estimated_route = dto.estimatedRoute;
    if (dto.finishedRoute) this.finished_route = dto.finishedRoute;
  }
}
