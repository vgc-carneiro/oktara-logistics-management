import { IShipment } from '../../../shipments/domain/entities/IShipment'
import { ILocation } from '../../../warehouses/domain/entities/ILocation'
import { EStatusPackage } from './EStatusPackage'

export interface IPackage {
  id: string
  shipment_id?: string
  location_id?: string
  status_id: EStatusPackage
  latitude_destination: number
  longitude_destination: number
  shipment?: IShipment
  location?: ILocation
}
