import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IPackage } from '../entities/IPackage'

export interface IPackageRepository {
  getAll(): Promise<IListResponseData<IPackage>>
  post(dto: IPackage): Promise<IPackage>
  get(id: string): Promise<IPackage>
  assignLocation(packageID: string, locationID: string): Promise<IPackage>
  putShipment(packageID: string, shipmentID: string): Promise<IPackage>
  deliverPackage(packageID: string): Promise<IPackage>
}
