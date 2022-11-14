import { AxiosResponse } from 'axios'
import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IListResponseData } from '../../../shared/types/IListResponseData'
import { IPackage } from '../domain/entities/IPackage'
import { IPackageRepository } from '../domain/repositories/IPackageRepository'

const http = new ServiceConfig()
export class PackageRepository implements IPackageRepository {
  async getAll(): Promise<IListResponseData<IPackage>> {
    const response: AxiosResponse<IListResponseData<IPackage>> = await http.get(`/packages`)
    return response.data
  }
  async post(dto: IPackage): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.post(`/packages`, dto)
    return response.data
  }
  async get(id: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.get(`/packages/${id}`)
    return response.data
  }
  async assignLocation(packageID: string, locationID: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(
      `/packages/${packageID}/location/${locationID}`,
    )
    return response.data
  }
  async putShipment(packageID: string, shipmentID: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(
      `/packages/${packageID}/shipment/${shipmentID}`,
    )
    return response.data
  }
  async deliverPackage(packageID: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(`/packages/deliver/${packageID}`)
    return response.data
  }
}
