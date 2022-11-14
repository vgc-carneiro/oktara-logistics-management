import { AxiosResponse } from 'axios'
import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IListResponseData } from '../../../shared/types/IListResponseData'
import { IPackageLocationDTO } from '../domain/dtos/IPackageLocationDTO'
import { IPackageShipmentDTO } from '../domain/dtos/IPackageShipmentDTO'
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
  async assignLocation(dto: IPackageLocationDTO): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(
      `/packages/${dto.packageID}/location/${dto.locationID}`,
    )
    return response.data
  }
  async putShipment(dto: IPackageShipmentDTO): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(
      `/packages/${dto.packageID}/shipment/${dto.shipmentID}`,
    )
    return response.data
  }
  async deliverPackage(packageID: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(`/packages/deliver/${packageID}`)
    return response.data
  }
}
