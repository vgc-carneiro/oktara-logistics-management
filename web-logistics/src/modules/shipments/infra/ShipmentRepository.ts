import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IListResponseData } from '../../../shared/types/IListResponseData'
import { IShipment } from '../domain/entities/IShipment'
import { IShipmentRepository } from '../domain/repositories/IShipmentRepository'

const http = new ServiceConfig()
export class ShipmentRepository implements IShipmentRepository {
  getAll(): Promise<IListResponseData<IShipment>> {
    throw new Error('Method not implemented.')
  }
  post(dto: IShipment): Promise<IShipment> {
    throw new Error('Method not implemented.')
  }
  get(id: string): Promise<IShipment> {
    throw new Error('Method not implemented.')
  }
  startDelivering(shipmentID: string): Promise<IShipment> {
    throw new Error('Method not implemented.')
  }
}
