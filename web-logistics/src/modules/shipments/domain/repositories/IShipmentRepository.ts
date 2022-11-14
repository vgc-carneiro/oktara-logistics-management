import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IShipment } from '../entities/IShipment'

export interface IShipmentRepository {
  getAll(): Promise<IListResponseData<IShipment>>
  post(dto: IShipment): Promise<IShipment>
  get(id: string): Promise<IShipment>
  startDelivering(shipmentID: string): Promise<IShipment>
}
