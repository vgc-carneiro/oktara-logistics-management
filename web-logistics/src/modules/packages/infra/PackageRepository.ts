import { AxiosResponse } from 'axios'
import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IListResponseData } from '../../../shared/types/IListResponseData'
import { IPackage } from '../domain/entities/IPackage'
import { IPackageRepository } from '../domain/repositories/IPackageRepository'

const http = new ServiceConfig()
export class PackageRepository implements IPackageRepository {
  post(dto: IPackage): Promise<IPackage> {
    throw new Error('Method not implemented.')
  }
  get(id: string): Promise<IPackage> {
    throw new Error('Method not implemented.')
  }
  assignLocation(packageID: string, locationID: string): Promise<IPackage> {
    throw new Error('Method not implemented.')
  }
  putShipment(packageID: string, shipmentID: string): Promise<IPackage> {
    throw new Error('Method not implemented.')
  }
  deliverPackage(packageID: string): Promise<IPackage> {
    throw new Error('Method not implemented.')
  }
  async getAll(): Promise<IListResponseData<IPackage>> {
    const response: AxiosResponse<IListResponseData<IPackage>> = await http.get(`/packages`)
    return response.data
  }
}
