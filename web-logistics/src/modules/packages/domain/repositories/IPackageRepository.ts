import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IPackageLocationDTO } from '../dtos/IPackageLocationDTO'
import { IPackageShipmentDTO } from '../dtos/IPackageShipmentDTO'
import { IPackage } from '../entities/IPackage'

export interface IPackageRepository {
  getAll(): Promise<IListResponseData<IPackage>>
  post(dto: IPackage): Promise<IPackage>
  get(id: string): Promise<IPackage>
  assignLocation(dto: IPackageLocationDTO): Promise<IPackage>
  putShipment(dto: IPackageShipmentDTO): Promise<IPackage>
  deliverPackage(packageID: string): Promise<IPackage>
}
