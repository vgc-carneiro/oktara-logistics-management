import { IPackage } from '../../../packages/domain/entities/IPackage'

export interface IShipment {
  id: string
  start_route?: Date
  estimated_route?: Date
  finished_route?: Date
  packages?: IPackage[]
}
