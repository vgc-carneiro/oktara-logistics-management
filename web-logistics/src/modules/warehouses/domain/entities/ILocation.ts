import { IPackage } from '../../../packages/domain/entities/IPackage'

export interface ILocation {
  id: string
  warehouse_id: string
  package?: IPackage
  floor?: string
  hall?: string
  shelf: string
}
