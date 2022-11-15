import { IPackageDTO } from '../dtos/IPackageDTO'
import { IPackageLocationDTO } from '../dtos/IPackageLocationDTO'
import { IPackageShipmentDTO } from '../dtos/IPackageShipmentDTO'
import { IPackage } from '../entities/IPackage'

export interface IPackageRepository {
  getAll(): Promise<IPackage[]>
  post(dto: IPackageDTO): Promise<IPackage>
  get(id: string): Promise<IPackage>
  assignLocation(dto: IPackageLocationDTO): Promise<IPackage>
  putShipment(dto: IPackageShipmentDTO): Promise<IPackage>
  putToShipmentAvailable(id: string): Promise<IPackage>
  deliverPackage(packageID: string): Promise<IPackage>
}
