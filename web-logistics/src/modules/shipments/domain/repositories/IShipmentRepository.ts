import { IShipment } from '../entities/IShipment'

export interface IShipmentRepository {
  getAll(): Promise<IShipment[]>
  post(dto: IShipment): Promise<IShipment>
  get(id: string): Promise<IShipment>
  startDelivering(shipmentID: string): Promise<IShipment>
}
